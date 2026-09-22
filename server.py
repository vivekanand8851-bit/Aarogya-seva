"""
Aarogya Seva Backend - FastAPI + MongoDB
Features: Auth (JWT), Products, Orders, Rewards, Razorpay Payment, Admin
"""
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import bcrypt
import jwt
import razorpay
import hmac
import hashlib
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime, timedelta, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Config
MONGO_URL = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']
JWT_SECRET = os.environ.get('JWT_SECRET', '')
if len(JWT_SECRET.encode('utf-8')) < 32:
    raise RuntimeError('JWT_SECRET must be configured with at least 32 bytes.')
FRONTEND_URLS = [u.strip().rstrip('/') for u in os.environ.get('FRONTEND_URL', 'http://localhost:3000').split(',') if u.strip()]
RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', '')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', '')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@aarogyaseva.com')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'Aarogya@2025')

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Razorpay client (test placeholders okay - won't crash on init)
try:
    rzp_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)) if RAZORPAY_KEY_ID else None
except Exception:
    rzp_client = None

app = FastAPI(title="Aarogya Seva API")
api = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)


# ============ MODELS ============
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    password: str

class UserLogin(BaseModel):
    identifier: str  # email or phone
    password: str

class ProductIn(BaseModel):
    name: str
    slug: str
    category: str
    price: float
    mrp: float
    discount: int = 0
    rating: float = 4.5
    reviews: int = 0
    inStock: bool = True
    isBestseller: bool = False
    isNew: bool = False
    badge: Optional[str] = ""
    shortDesc: str = ""
    description: str = ""
    benefits: List[str] = []
    ingredients: str = ""
    dosage: str = ""
    images: List[str] = []
    stock: int = 100

class CartItem(BaseModel):
    productId: str
    qty: int

class Address(BaseModel):
    name: str
    phone: str
    email: str
    address: str
    city: str
    state: str
    pincode: str

class OrderCreate(BaseModel):
    items: List[CartItem]
    address: Address
    paymentMethod: str  # cod | razorpay
    couponCode: Optional[str] = ""
    pointsRedeemed: int = 0

class PaymentVerify(BaseModel):
    orderId: str
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


# ============ HELPERS ============
def now_iso():
    return datetime.now(timezone.utc).isoformat()

def make_id():
    return str(uuid.uuid4())

def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()

def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode(), hashed.encode())
    except Exception:
        return False

def create_token(data: dict) -> str:
    payload = {**data, "exp": datetime.now(timezone.utc) + timedelta(days=30)}
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def clean_doc(doc):
    if doc and "_id" in doc:
        doc.pop("_id", None)
    return doc

async def get_current_user(creds: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    if not creds:
        raise HTTPException(status_code=401, detail="Auth required")
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_id = payload.get("sub")
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    clean_doc(user)
    user.pop("password", None)
    return user

async def get_admin(user=Depends(get_current_user)):
    if not user.get("isAdmin"):
        raise HTTPException(status_code=403, detail="Admin only")
    return user


# ============ HEALTH ============
@api.get("/")
async def root():
    return {"message": "Aarogya Seva API", "status": "ok"}


# ============ AUTH ============
@api.post("/auth/signup")
async def signup(body: UserSignup):
    existing = await db.users.find_one({"email": body.email.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = {
        "id": make_id(),
        "name": body.name,
        "email": body.email.lower(),
        "phone": body.phone or "",
        "password": hash_password(body.password),
        "isAdmin": False,
        "rewardPoints": 100,  # welcome bonus
        "createdAt": now_iso(),
    }
    await db.users.insert_one(user)
    token = create_token({"sub": user["id"], "email": user["email"], "isAdmin": False})
    user.pop("password"); user.pop("_id", None)
    return {"token": token, "user": user}

@api.post("/auth/login")
async def login(body: UserLogin):
    ident = body.identifier.strip().lower()
    # Try email first, then phone
    user = await db.users.find_one({"$or": [{"email": ident}, {"phone": body.identifier.strip()}]})
    if not user or not verify_password(body.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"sub": user["id"], "email": user["email"], "isAdmin": user.get("isAdmin", False)})
    user.pop("password"); clean_doc(user)
    return {"token": token, "user": user}

@api.get("/auth/me")
async def me(user=Depends(get_current_user)):
    return user


# ============ PRODUCTS ============
@api.get("/products")
async def list_products(category: Optional[str] = None, q: Optional[str] = None):
    query = {}
    if category and category != "all":
        query["category"] = category
    if q:
        query["name"] = {"$regex": q, "$options": "i"}
    products = await db.products.find(query).to_list(500)
    for p in products:
        clean_doc(p)
    return products

@api.get("/products/{slug}")
async def get_product(slug: str):
    p = await db.products.find_one({"$or": [{"slug": slug}, {"id": slug}]})
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    clean_doc(p)
    return p

@api.post("/products")
async def create_product(body: ProductIn, admin=Depends(get_admin)):
    doc = body.dict()
    doc["id"] = make_id()
    doc["createdAt"] = now_iso()
    await db.products.insert_one(doc)
    clean_doc(doc)
    return doc

@api.put("/products/{pid}")
async def update_product(pid: str, body: ProductIn, admin=Depends(get_admin)):
    upd = body.dict()
    r = await db.products.update_one({"id": pid}, {"$set": upd})
    if r.matched_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return {"ok": True}

@api.delete("/products/{pid}")
async def delete_product(pid: str, admin=Depends(get_admin)):
    await db.products.delete_one({"id": pid})
    return {"ok": True}


# ============ ORDERS & PAYMENT ============
async def _calc_totals(items: List[CartItem], points_redeemed: int = 0):
    """Compute totals from DB prices (never trust client)."""
    if not items:
        raise HTTPException(status_code=400, detail='Cart is empty')
    if points_redeemed < 0:
        raise HTTPException(status_code=400, detail='Invalid reward points')
    line_items = []
    subtotal = 0
    mrp_total = 0
    for c in items:
        if c.qty < 1 or c.qty > 100:
            raise HTTPException(status_code=400, detail='Invalid quantity')
        p = await db.products.find_one({"id": c.productId})
        if not p:
            raise HTTPException(status_code=400, detail=f"Product {c.productId} not found")
        if p.get("stock") is not None and c.qty > int(p.get("stock", 0)):
            raise HTTPException(status_code=400, detail=f"Only {int(p.get('stock', 0))} units available for {p['name']}")
        line = {
            "productId": p["id"],
            "name": p["name"],
            "slug": p.get("slug", ""),
            "image": (p.get("images") or [""])[0],
            "price": p["price"],
            "mrp": p["mrp"],
            "qty": c.qty,
        }
        line_items.append(line)
        subtotal += p["price"] * c.qty
        mrp_total += p["mrp"] * c.qty
    shipping = 0 if subtotal >= 499 else 49
    # Redeem: 100 pts = ₹50, cap at 20% of subtotal
    max_redeem_value = int(subtotal * 0.2)
    redeem_value = min(int(points_redeemed / 2), max_redeem_value)
    points_used = redeem_value * 2
    total = max(1, subtotal + shipping - redeem_value)
    return {
        "items": line_items,
        "subtotal": subtotal,
        "mrpTotal": mrp_total,
        "savings": mrp_total - subtotal,
        "shipping": shipping,
        "pointsUsed": points_used,
        "redeemValue": redeem_value,
        "total": total,
    }

@api.post("/orders/preview")
async def preview_order(body: OrderCreate, user=Depends(get_current_user)):
    if body.pointsRedeemed > user.get("rewardPoints", 0):
        raise HTTPException(status_code=400, detail="Insufficient reward points")
    totals = await _calc_totals(body.items, body.pointsRedeemed)
    return totals

@api.post("/orders")
async def create_order(body: OrderCreate, user=Depends(get_current_user)):
    if body.paymentMethod not in {"cod", "razorpay"}:
        raise HTTPException(status_code=400, detail="Invalid payment method")
    if body.pointsRedeemed > user.get("rewardPoints", 0):
        raise HTTPException(status_code=400, detail="Insufficient reward points")
    totals = await _calc_totals(body.items, body.pointsRedeemed)

    order_id = "AS" + str(int(datetime.now().timestamp()))[-8:]
    order_doc = {
        "id": make_id(),
        "orderNumber": order_id,
        "userId": user["id"],
        "userEmail": user["email"],
        "items": totals["items"],
        "subtotal": totals["subtotal"],
        "shipping": totals["shipping"],
        "pointsUsed": totals["pointsUsed"],
        "redeemValue": totals["redeemValue"],
        "savings": totals["savings"],
        "total": totals["total"],
        "address": body.address.dict(),
        "paymentMethod": body.paymentMethod,
        "paymentStatus": "pending",
        "status": "placed",
        "razorpayOrderId": None,
        "createdAt": now_iso(),
        "trackingSteps": [
            {"label": "Order Placed", "done": True, "date": now_iso()},
            {"label": "Packed", "done": False, "date": ""},
            {"label": "Shipped", "done": False, "date": ""},
            {"label": "Out for Delivery", "done": False, "date": ""},
            {"label": "Delivered", "done": False, "date": ""},
        ],
    }

    # For Razorpay: create razorpay order
    if body.paymentMethod == "razorpay":
        if not rzp_client:
            raise HTTPException(status_code=500, detail="Razorpay not configured. Please set live keys.")
        try:
            rzp_order = rzp_client.order.create({
                "amount": int(totals["total"] * 100),  # paise
                "currency": "INR",
                "receipt": order_id,
                "notes": {"orderId": order_id, "userId": user["id"]},
            })
            order_doc["razorpayOrderId"] = rzp_order["id"]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Razorpay error: {str(e)}")
    elif body.paymentMethod == "cod":
        order_doc["paymentStatus"] = "cod_pending"
        # Deduct points immediately for COD
        if totals["pointsUsed"] > 0:
            await db.users.update_one({"id": user["id"]}, {"$inc": {"rewardPoints": -totals["pointsUsed"]}})
        # Award new points (5 per ₹100 spent)
        earned = int(totals["subtotal"] / 100) * 5
        if earned > 0:
            await db.users.update_one({"id": user["id"]}, {"$inc": {"rewardPoints": earned}})
        order_doc["pointsEarned"] = earned

    await db.orders.insert_one(order_doc)
    clean_doc(order_doc)
    return {
        "order": order_doc,
        "razorpayKeyId": RAZORPAY_KEY_ID if body.paymentMethod == "razorpay" else None,
    }

@api.post("/payment/verify")
async def verify_payment(body: PaymentVerify, user=Depends(get_current_user)):
    order = await db.orders.find_one({"id": body.orderId, "userId": user["id"]})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.get("paymentMethod") != "razorpay" or order.get("razorpayOrderId") != body.razorpay_order_id:
        raise HTTPException(status_code=400, detail="Payment order mismatch")
    if order.get("paymentStatus") == "paid":
        raise HTTPException(status_code=400, detail="Payment already verified")

    # Verify signature
    msg = f"{body.razorpay_order_id}|{body.razorpay_payment_id}"
    expected = hmac.new(RAZORPAY_KEY_SECRET.encode(), msg.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, body.razorpay_signature):
        await db.orders.update_one({"id": body.orderId}, {"$set": {"paymentStatus": "failed"}})
        raise HTTPException(status_code=400, detail="Invalid payment signature")

    # Update order
    await db.orders.update_one(
        {"id": body.orderId},
        {"$set": {
            "paymentStatus": "paid",
            "razorpayPaymentId": body.razorpay_payment_id,
            "razorpaySignature": body.razorpay_signature,
        }},
    )

    # Reward points
    subtotal = order.get("subtotal", 0)
    points_used = order.get("pointsUsed", 0)
    if points_used > 0:
        await db.users.update_one({"id": user["id"]}, {"$inc": {"rewardPoints": -points_used}})
    earned = int(subtotal / 100) * 5
    if earned > 0:
        await db.users.update_one({"id": user["id"]}, {"$inc": {"rewardPoints": earned}})
        await db.orders.update_one({"id": body.orderId}, {"$set": {"pointsEarned": earned}})

    return {"ok": True, "pointsEarned": earned}

@api.get("/orders")
async def my_orders(user=Depends(get_current_user)):
    orders = await db.orders.find({"userId": user["id"]}).sort("createdAt", -1).to_list(100)
    for o in orders:
        clean_doc(o)
    return orders

@api.get("/orders/{order_number}")
async def get_order(order_number: str, user=Depends(get_current_user)):
    q = {"orderNumber": order_number}
    if not user.get("isAdmin"):
        q["userId"] = user["id"]
    order = await db.orders.find_one(q)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    clean_doc(order)
    return order


# ============ ADMIN ============
@api.get("/admin/stats")
async def admin_stats(admin=Depends(get_admin)):
    total_users = await db.users.count_documents({})
    total_orders = await db.orders.count_documents({})
    total_products = await db.products.count_documents({})
    revenue_pipeline = [{"$match": {"paymentStatus": {"$in": ["paid", "cod_pending"]}}},
                        {"$group": {"_id": None, "total": {"$sum": "$total"}}}]
    rev = await db.orders.aggregate(revenue_pipeline).to_list(1)
    revenue = rev[0]["total"] if rev else 0
    return {"users": total_users, "orders": total_orders, "products": total_products, "revenue": revenue}

@api.get("/admin/orders")
async def admin_orders(admin=Depends(get_admin)):
    orders = await db.orders.find().sort("createdAt", -1).to_list(500)
    for o in orders:
        clean_doc(o)
    return orders

@api.get("/admin/users")
async def admin_users(admin=Depends(get_admin)):
    users = await db.users.find().sort("createdAt", -1).to_list(500)
    for u in users:
        clean_doc(u); u.pop("password", None)
    return users

@api.put("/admin/orders/{order_id}/status")
async def update_order_status(order_id: str, status: str = Query(...), admin=Depends(get_admin)):
    valid = ["placed", "packed", "shipped", "out_for_delivery", "delivered", "cancelled"]
    if status not in valid:
        raise HTTPException(status_code=400, detail="Invalid status")
    order = await db.orders.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    # Update tracking steps
    map_to_step = {"placed": 0, "packed": 1, "shipped": 2, "out_for_delivery": 3, "delivered": 4}
    idx = map_to_step.get(status, 0)
    steps = order.get("trackingSteps", [])
    for i, s in enumerate(steps):
        if i <= idx:
            s["done"] = True
            if not s.get("date"):
                s["date"] = now_iso()
        else:
            s["done"] = False
    await db.orders.update_one({"id": order_id}, {"$set": {"status": status, "trackingSteps": steps}})
    return {"ok": True}


# ============ SEED DATA ============
async def _seed_data():
    """Seed products & admin user if empty. Safe to call from startup."""
    # Admin user
    existing_admin = await db.users.find_one({"email": ADMIN_EMAIL})
    if not existing_admin:
        await db.users.insert_one({
            "id": make_id(),
            "name": "Admin",
            "email": ADMIN_EMAIL,
            "phone": "+918470807059",
            "password": hash_password(ADMIN_PASSWORD),
            "isAdmin": True,
            "rewardPoints": 0,
            "createdAt": now_iso(),
        })

    # Products
    count = await db.products.count_documents({})
    if count > 0:
        return {"ok": True, "message": f"Already seeded: {count} products"}

    LOGO_BASE = "https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts"
    IMG_ARJUNA = f"{LOGO_BASE}/9nl7yn4a_Arjuna.png"
    IMG_PILES_GILOY = f"{LOGO_BASE}/0z5z0vli_Piles%20Norm.png"
    IMG_PILES_DIGUP = f"{LOGO_BASE}/pqxkdic1_Piles%20Norm%20%2B%20Dig%20Up.png"
    IMG_SHIL_ASHWA = f"{LOGO_BASE}/mvgj6it7_Shilajeet%20%2BAshwagandha.png"

    seed_products = [
        {"id": make_id(), "name": "Arjuna Capsules", "slug": "arjuna-capsules", "category": "heart-health", "price": 899, "mrp": 2999, "discount": 70, "rating": 4.7, "reviews": 1284, "inStock": True, "isBestseller": True, "isNew": False, "badge": "BESTSELLER", "shortDesc": "Supports heart health naturally — 100% pure Arjuna bark extract, 1000mg per capsule.", "description": "Aarogya Seva Arjuna Capsules are made from premium Terminalia arjuna bark, a legendary Ayurvedic herb documented in classical texts for cardiovascular support.", "benefits": ["Supports healthy heart function", "Helps maintain cholesterol balance", "Improves circulation & stamina", "Rich in antioxidants", "100% Natural, AYUSH-certified"], "ingredients": "Arjuna Bark Extract 1000mg", "dosage": "1 capsule twice daily after meals.", "images": [IMG_ARJUNA], "stock": 500, "createdAt": now_iso()},
        {"id": make_id(), "name": "Shilajeet Capsules 1000mg", "slug": "shilajeet-capsules", "category": "mens-wellness", "price": 1399, "mrp": 4998, "discount": 72, "rating": 4.8, "reviews": 2156, "inStock": True, "isBestseller": True, "isNew": False, "badge": "TOP SELLER", "shortDesc": "Pure Himalayan Shilajeet — authentic, potent Rasayan for energy & vitality.", "description": "Sourced from pristine Himalayan altitudes above 16,000 ft. Purified using traditional Shodhana methods.", "benefits": ["Boosts energy & stamina", "Rich in 85+ trace minerals", "Enhances testosterone & vitality", "Supports brain health", "Authentic Ayurvedic Rasayan"], "ingredients": "Purified Shilajeet Extract 1000mg", "dosage": "1 capsule daily with warm milk.", "images": [IMG_SHIL_ASHWA], "stock": 500, "createdAt": now_iso()},
        {"id": make_id(), "name": "Ashwagandha Extract Capsules", "slug": "ashwagandha-extract-capsules", "category": "stress-relief", "price": 799, "mrp": 2799, "discount": 71, "rating": 4.6, "reviews": 1420, "inStock": True, "isBestseller": True, "isNew": False, "badge": "BESTSELLER", "shortDesc": "Relieves stress & anxiety, supports vitality, boosts strength & stamina.", "description": "Premium Withania somnifera root extract, clinically proven adaptogen.", "benefits": ["Relieves stress & anxiety", "Supports vitality & energy", "Boosts strength & stamina", "Improves sleep quality", "100% Natural"], "ingredients": "Ashwagandha Root Extract 1000mg", "dosage": "1-2 capsules daily after meals.", "images": [IMG_SHIL_ASHWA], "stock": 500, "createdAt": now_iso()},
        {"id": make_id(), "name": "Giloy Extract Capsules", "slug": "giloy-extract-capsules", "category": "immunity", "price": 649, "mrp": 2299, "discount": 71, "rating": 4.7, "reviews": 986, "inStock": True, "isBestseller": True, "isNew": False, "badge": "IMMUNITY", "shortDesc": "Boosts immunity & stamina, supports liver health, detoxifies blood naturally.", "description": "Giloy (Guduchi) is revered in Ayurveda as Amrita — the root of immortality.", "benefits": ["Boosts immunity & stamina", "Supports liver health", "Detoxifies blood naturally", "Rich in antioxidants", "Pure & Potent"], "ingredients": "Giloy Stem Extract 1000mg", "dosage": "1 capsule twice daily.", "images": [IMG_PILES_GILOY], "stock": 500, "createdAt": now_iso()},
        {"id": make_id(), "name": "DIG-UP Capsules", "slug": "dig-up-capsules", "category": "mens-wellness", "price": 849, "mrp": 2998, "discount": 72, "rating": 4.5, "reviews": 634, "inStock": True, "isBestseller": False, "isNew": True, "badge": "NEW", "shortDesc": "Natural male potency support — health, vitality & improved libido.", "description": "A classical Ayurvedic formulation for men's wellness combining time-tested herbs.", "benefits": ["Natural male potency support", "Improves health & vitality", "Supports libido naturally", "100% Ayurvedic formulation", "Pure & Potent"], "ingredients": "Ashwagandha, Safed Musli, Shilajeet, Kaunch Beej, Gokshura", "dosage": "1 capsule twice daily.", "images": [IMG_PILES_DIGUP], "stock": 500, "createdAt": now_iso()},
        {"id": make_id(), "name": "Piles Norm Capsules", "slug": "piles-norm-capsules", "category": "specialty", "price": 749, "mrp": 2599, "discount": 71, "rating": 4.6, "reviews": 512, "inStock": True, "isBestseller": False, "isNew": True, "badge": "NEW", "shortDesc": "Relief from hemorrhoids — reduces swelling & discomfort naturally.", "description": "A gentle Ayurvedic formulation for the natural management of piles/hemorrhoids.", "benefits": ["Relief from hemorrhoids", "Reduces swelling & discomfort", "100% Natural herbs", "Pure & Potent", "Safe for long-term use"], "ingredients": "Nagkesar, Haritaki, Neem, Triphala, Rasont, Kutki", "dosage": "1 capsule twice daily after meals.", "images": [IMG_PILES_GILOY, IMG_PILES_DIGUP], "stock": 500, "createdAt": now_iso()},
        {"id": make_id(), "name": "Shilajeet + Ashwagandha Combo", "slug": "shilajeet-ashwagandha-combo", "category": "mens-wellness", "price": 1899, "mrp": 6999, "discount": 73, "rating": 4.9, "reviews": 428, "inStock": True, "isBestseller": True, "isNew": False, "badge": "COMBO DEAL", "shortDesc": "The ultimate men's vitality combo — Shilajeet + Ashwagandha at best price.", "description": "Get the power of two legendary Ayurvedic Rasayans in one combo.", "benefits": ["Complete men's vitality support", "Save ₹1600 vs individual", "Energy + Stress relief combo", "60 + 60 = 120 capsules", "Trusted Aarogya Seva quality"], "ingredients": "Shilajeet 1000mg + Ashwagandha 1000mg (60 caps each)", "dosage": "1 of each daily.", "images": [IMG_SHIL_ASHWA], "stock": 300, "createdAt": now_iso()},
        {"id": make_id(), "name": "Piles Norm + DIG-UP Combo", "slug": "piles-digup-combo", "category": "specialty", "price": 1499, "mrp": 5499, "discount": 73, "rating": 4.5, "reviews": 218, "inStock": True, "isBestseller": False, "isNew": True, "badge": "COMBO", "shortDesc": "Complete wellness combo — men's health & digestive-anal comfort.", "description": "Piles Norm + DIG-UP combo for men who want targeted wellness.", "benefits": ["Two-in-one wellness pack", "Save ₹500 combo pricing", "Both 100% herbal", "120 capsules total", "AYUSH-certified"], "ingredients": "Piles Norm 1000mg + DIG-UP 1000mg (60 caps each)", "dosage": "1 of each twice daily.", "images": [IMG_PILES_DIGUP], "stock": 300, "createdAt": now_iso()},
    ]
    await db.products.insert_many(seed_products)
    return {"ok": True, "seeded": len(seed_products)}


@api.post("/seed")
async def seed_data(admin=Depends(get_admin)):
    """Admin-only manual seed endpoint."""
    return await _seed_data()




# ============ DATA HARDENING ============
LEGACY_PRODUCT_COPY = {
        "arjuna-capsules": {"shortDesc": "Arjuna bark extract for traditional Ayurvedic wellness and everyday vitality.", "description": "Aarogya Seva Arjuna Capsules use Terminalia arjuna bark extract, an herb with a long history of use in Ayurveda. Product information should be read together with the label, ingredient details and recommended directions.", "benefits": ["Traditional Ayurvedic herbal ingredient","Supports a balanced wellness routine","Made with Arjuna bark extract","Vegetarian capsule","Clear ingredient and dosage information"]},
        "shilajeet-capsules": {"shortDesc": "Purified Shilajeet extract for traditional Ayurvedic vitality and everyday wellness.", "description": "Aarogya Seva Shilajeet Capsules contain purified Shilajeet extract. Shilajeet has a long history of traditional Ayurvedic use; modern supplement claims can vary by preparation, so compare the ingredient amount, processing and label information.", "benefits": ["Traditional Ayurvedic ingredient","Supports everyday vitality","Purified extract","Vegetarian capsule","Clear serving information"]},
        "ashwagandha-extract-capsules": {"shortDesc": "Ashwagandha root extract for traditional Ayurvedic wellness and a balanced daily routine.", "description": "Aarogya Seva Ashwagandha Extract Capsules contain Withania somnifera root extract. Ashwagandha has a long history of use in Ayurveda; evidence and outcomes can vary by preparation and person.", "benefits": ["Traditional Ayurvedic herb","Supports everyday wellness","Root extract","Vegetarian capsule","Clear serving information"]},
        "giloy-extract-capsules": {"shortDesc": "Giloy (Guduchi) extract for traditional Ayurvedic wellness and everyday vitality.", "description": "Aarogya Seva Giloy Extract Capsules contain Giloy (Guduchi) stem extract, an herb traditionally used in Ayurveda. Product use should follow the label and should not be treated as a substitute for medical care.", "benefits": ["Traditional Ayurvedic herb","Supports everyday wellness","Stem extract","Vegetarian capsule","Clear ingredient information"]},
        "dig-up-capsules": {"shortDesc": "Ayurvedic herbal blend formulated for men's general wellness and vitality.", "description": "DIG-UP is an Ayurvedic herbal blend for men's general wellness. The formulation combines commonly used Ayurvedic herbs; individual ingredients, serving size and label directions should be reviewed before use.", "benefits": ["Men's general wellness support","Ayurvedic herbal blend","Supports a balanced daily routine","Vegetarian capsule","Clear ingredient information"]},
        "piles-norm-capsules": {"shortDesc": "Ayurvedic herbal formulation for digestive and personal wellness.", "description": "Piles Norm is an Ayurvedic herbal formulation. Product information and directions should be read carefully, and persistent or concerning symptoms should be discussed with a qualified healthcare professional.", "benefits": ["Ayurvedic herbal formulation","Supports digestive and personal wellness","Plant-based ingredients","Clear ingredient information","Use according to label directions"]},
        "shilajeet-ashwagandha-combo": {"shortDesc": "Shilajeet + Ashwagandha combo for traditional Ayurvedic wellness and everyday vitality.", "description": "This combo pairs purified Shilajeet extract with Ashwagandha root extract. Both ingredients have a history of traditional Ayurvedic use; product claims can vary by preparation, so review the label and serving directions.", "benefits": ["Two traditional Ayurvedic ingredients","Supports everyday wellness","Shilajeet + Ashwagandha combination","Convenient combo pack","Clear serving information"]},
        "piles-digup-combo": {"shortDesc": "Piles Norm + DIG-UP combo for general digestive and men's wellness.", "description": "This combo pairs two Ayurvedic herbal formulations for general wellness. Review each product's ingredients and label directions before use.", "benefits": ["Two Ayurvedic herbal formulations","General wellness support","Convenient combo pack","Clear ingredient information","Use according to label directions"]},
}

async def harden_legacy_product_copy():
    marker = await db.settings.find_one({"key": "legacy_product_copy_hardened_v1"})
    if marker:
        return
    for slug, copy in LEGACY_PRODUCT_COPY.items():
        await db.products.update_one(
            {"slug": slug},
            {"$set": {**copy, "rating": 0, "reviews": 0}},
        )
    await db.settings.update_one(
        {"key": "legacy_product_copy_hardened_v1"},
        {"$set": {"key": "legacy_product_copy_hardened_v1", "appliedAt": now_iso()}},
        upsert=True,
    )

app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=FRONTEND_URLS,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_seed():
    """Auto-seed on startup if empty."""
    try:
        count = await db.products.count_documents({})
        admin = await db.users.find_one({"email": ADMIN_EMAIL})
        if count == 0 or not admin:
            await _seed_data()
            logger.info("Seed complete")
        await harden_legacy_product_copy()
    except Exception as e:
        logger.error(f"Startup seed failed: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
