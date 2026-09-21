import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Users, Package, ShoppingBag, IndianRupee, Loader2, Plus, Edit3, Trash2, X,
  Search, ExternalLink, LayoutDashboard, LogOut, ShieldCheck, Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../lib/api';
import { toast } from '../hooks/use-toast';

const STATUSES = ['placed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];
const CATEGORIES = [
  { id: 'heart-health', name: 'Heart Health' },
  { id: 'immunity', name: 'Immunity Boosters' },
  { id: 'digestion', name: 'Digestive Health' },
  { id: 'mens-wellness', name: "Men's Wellness" },
  { id: 'stress-relief', name: 'Stress & Sleep' },
  { id: 'specialty', name: 'Specialty Care' },
  { id: 'bone-joint', name: 'Bone & Joint' },
];

const emptyProduct = {
  name: '', slug: '', category: 'immunity',
  price: 0, mrp: 0, discount: 0,
  rating: 4.5, reviews: 0, stock: 100,
  inStock: true, isBestseller: false, isNew: false,
  badge: '', shortDesc: '', description: '',
  benefits: [], ingredients: '', dosage: '',
  images: [''],
};

// ================= Stats Card =================
const StatCard = ({ icon: Icon, label, val, color }) => (
  <div className="bg-white border border-[#ede4cf] rounded-xl p-5">
    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: color + '22' }}>
      <Icon size={20} style={{ color }} />
    </div>
    <div className="text-2xl font-bold text-[#0f3d2e] mt-3">{val}</div>
    <div className="text-xs text-[#8a7a5a]">{label}</div>
  </div>
);

// ================= Product Form Modal =================
function ProductFormModal({ product, onClose, onSaved }) {
  const [form, setForm] = useState(product || emptyProduct);
  const [busy, setBusy] = useState(false);
  const [benefitsText, setBenefitsText] = useState((product?.benefits || []).join('\n'));
  const [imagesText, setImagesText] = useState((product?.images || ['']).join('\n'));

  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Auto-compute discount
  useEffect(() => {
    if (form.mrp > 0 && form.price > 0 && form.price <= form.mrp) {
      const d = Math.round(((form.mrp - form.price) / form.mrp) * 100);
      setForm((f) => ({ ...f, discount: d }));
    }
  }, [form.price, form.mrp]);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        mrp: Number(form.mrp),
        discount: Number(form.discount),
        rating: Number(form.rating),
        reviews: Number(form.reviews),
        stock: Number(form.stock),
        benefits: benefitsText.split('\n').map((s) => s.trim()).filter(Boolean),
        images: imagesText.split('\n').map((s) => s.trim()).filter(Boolean),
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      };
      if (product?.id) {
        await api.updateProduct(product.id, payload);
        toast({ title: 'Product updated', description: form.name });
      } else {
        await api.createProduct(payload);
        toast({ title: 'Product created', description: form.name });
      }
      onSaved();
    } catch (err) {
      toast({ title: 'Save failed', description: err?.response?.data?.detail || 'Try again' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto py-8 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-[#ede4cf] sticky top-0 bg-white rounded-t-2xl">
          <h3 className="font-serif text-xl text-[#0f3d2e]">{product?.id ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="text-[#6a6a6a] hover:text-[#0f3d2e]"><X size={22} /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          {/* Preview */}
          {imagesText.trim() && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {imagesText.split('\n').filter((s) => s.trim()).map((url, i) => (
                <img key={i} src={url.trim()} alt={`preview ${i}`}
                  className="w-24 h-24 object-contain bg-[#faf6ec] rounded-lg border border-[#ede4cf] flex-shrink-0" />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Product Name *" required value={form.name} onChange={(v) => upd('name', v)} />
            <Field label="Slug (auto if blank)" value={form.slug} onChange={(v) => upd('slug', v)} placeholder="ashwagandha-capsules" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Selling Price ₹ *" required type="number" value={form.price} onChange={(v) => upd('price', v)} />
            <Field label="MRP ₹ *" required type="number" value={form.mrp} onChange={(v) => upd('mrp', v)} />
            <Field label="Discount %" type="number" value={form.discount} onChange={(v) => upd('discount', v)} disabled />
            <Field label="Stock" type="number" value={form.stock} onChange={(v) => upd('stock', v)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Category *</label>
              <select required value={form.category} onChange={(e) => upd('category', e.target.value)}
                className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]">
                {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <Field label="Badge" value={form.badge} onChange={(v) => upd('badge', v)} placeholder="BESTSELLER / NEW" />
            <div className="flex flex-wrap items-center gap-3 pt-6">
              <Toggle label="In Stock" val={form.inStock} onChange={(v) => upd('inStock', v)} />
              <Toggle label="Bestseller" val={form.isBestseller} onChange={(v) => upd('isBestseller', v)} />
              <Toggle label="New Arrival" val={form.isNew} onChange={(v) => upd('isNew', v)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Rating (out of 5)" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(v) => upd('rating', v)} />
            <Field label="Number of Reviews" type="number" value={form.reviews} onChange={(v) => upd('reviews', v)} />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Image URLs (one per line) *</label>
            <textarea required rows={3} value={imagesText} onChange={(e) => setImagesText(e.target.value)}
              placeholder="https://example.com/product1.jpg&#10;https://example.com/product2.jpg"
              className="w-full font-mono text-xs border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
            <p className="text-[10px] text-[#8a7a5a] mt-1">Paste image links from web. First image = main product photo.</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Short Description *</label>
            <textarea required rows={2} value={form.shortDesc} onChange={(e) => upd('shortDesc', e.target.value)}
              className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Full Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => upd('description', e.target.value)}
              className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Key Benefits (one per line)</label>
            <textarea rows={4} value={benefitsText} onChange={(e) => setBenefitsText(e.target.value)}
              placeholder="Boosts immunity naturally&#10;Improves energy levels"
              className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Ingredients</label>
              <textarea rows={2} value={form.ingredients} onChange={(e) => upd('ingredients', e.target.value)}
                className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Dosage</label>
              <textarea rows={2} value={form.dosage} onChange={(e) => upd('dosage', e.target.value)}
                className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[#ede4cf]">
            <button type="button" onClick={onClose} className="flex-1 border border-[#0f3d2e] text-[#0f3d2e] font-semibold py-3 rounded-lg">Cancel</button>
            <button type="submit" disabled={busy} className="flex-1 bg-[#0f3d2e] text-white font-semibold py-3 rounded-lg disabled:opacity-60 flex items-center justify-center gap-2">
              {busy && <Loader2 size={16} className="animate-spin" />}
              {product?.id ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Field = ({ label, value, onChange, type = 'text', required = false, placeholder = '', disabled = false, step, min, max }) => (
  <div>
    <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">{label}</label>
    <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} disabled={disabled} step={step} min={min} max={max}
      className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec] disabled:opacity-70" />
  </div>
);

const Toggle = ({ label, val, onChange }) => (
  <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-[#0f3d2e]">
    <input type="checkbox" checked={val} onChange={(e) => onChange(e.target.checked)} className="accent-[#0f3d2e] w-4 h-4" />
    {label}
  </label>
);

// ================= Order Detail Modal =================
function OrderDetailModal({ order, onClose, onStatusUpdate }) {
  if (!order) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto py-8 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-[#ede4cf] sticky top-0 bg-white rounded-t-2xl">
          <div>
            <h3 className="font-serif text-xl text-[#0f3d2e]">Order #{order.orderNumber}</h3>
            <p className="text-xs text-[#8a7a5a]">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <button onClick={onClose}><X size={22} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-[#faf6ec] rounded-lg p-4">
              <div className="text-xs font-semibold text-[#8a7a5a] uppercase mb-2">Customer</div>
              <div className="font-semibold text-[#0f3d2e]">{order.address?.name}</div>
              <div className="text-[#4a4a4a]">{order.userEmail}</div>
              <div className="text-[#4a4a4a]">{order.address?.phone}</div>
              <div className="text-[#4a4a4a] mt-2">{order.address?.address}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}</div>
            </div>
            <div className="bg-[#faf6ec] rounded-lg p-4">
              <div className="text-xs font-semibold text-[#8a7a5a] uppercase mb-2">Payment</div>
              <div className="text-[#0f3d2e]"><b>Method:</b> {order.paymentMethod?.toUpperCase()}</div>
              <div className="text-[#0f3d2e]"><b>Status:</b> {order.paymentStatus}</div>
              <div className="text-[#0f3d2e]"><b>Total:</b> ₹{order.total?.toLocaleString()}</div>
              {order.pointsUsed > 0 && <div className="text-[#0a7a3f] text-xs">Redeemed: {order.pointsUsed} pts (₹{order.redeemValue})</div>}
              {order.pointsEarned > 0 && <div className="text-[#0a7a3f] text-xs">Earned: +{order.pointsEarned} pts</div>}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-[#8a7a5a] uppercase mb-2">Items</div>
            <div className="space-y-2">
              {order.items?.map((it, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#faf6ec] rounded-lg p-3">
                  {it.image && <img src={it.image} alt={it.name} className="w-12 h-12 object-contain bg-white rounded p-1" />}
                  <div className="flex-1">
                    <div className="font-semibold text-[#0f3d2e] text-sm">{it.name}</div>
                    <div className="text-xs text-[#8a7a5a]">Qty: {it.qty} × ₹{it.price?.toLocaleString()}</div>
                  </div>
                  <div className="font-semibold text-[#0f3d2e]">₹{(it.price * it.qty)?.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-[#8a7a5a] uppercase mb-2">Status Timeline</div>
            <div className="space-y-2">
              {order.trackingSteps?.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${s.done ? 'bg-[#0a7a3f]' : 'bg-[#ded1a8]'}`} />
                  <div className={`text-sm flex-1 ${s.done ? 'text-[#0f3d2e] font-semibold' : 'text-[#a89573]'}`}>{s.label}</div>
                  {s.date && <div className="text-xs text-[#8a7a5a]">{new Date(s.date).toLocaleString()}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#ede4cf]">
            <label className="text-sm font-semibold text-[#0f3d2e]">Update Status:</label>
            <select value={order.status} onChange={(e) => onStatusUpdate(order.id, e.target.value)}
              className="border border-[#ded1a8] rounded-lg px-3 py-2 text-sm bg-white">
              {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= Main Admin Page =================
export default function AdminPage() {
  const { user, authLoading, logout, loadProducts } = useApp();
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [detailOrder, setDetailOrder] = useState(null);
  const [q, setQ] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [s, o, u, p] = await Promise.all([
        api.adminStats(), api.adminOrders(), api.adminUsers(), api.listProducts(),
      ]);
      setStats(s); setOrders(o); setUsers(u); setProducts(p);
    } catch (e) {
      toast({ title: 'Load failed', description: e?.response?.data?.detail || 'Try again' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) load();
    // eslint-disable-next-line
  }, [user]);

  if (authLoading) return <div className="py-20 text-center text-[#8a7a5a]">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/account" replace />;

  const updateStatus = async (orderId, status) => {
    try {
      await api.adminUpdateStatus(orderId, status);
      toast({ title: 'Status updated', description: status.replace(/_/g, ' ') });
      const updated = await api.adminOrders();
      setOrders(updated);
      if (detailOrder) setDetailOrder(updated.find((o) => o.id === detailOrder.id) || null);
    } catch (e) {
      toast({ title: 'Update failed', description: e?.response?.data?.detail });
    }
  };

  const deleteProduct = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? Yeh vaapas nahi aayega.`)) return;
    try {
      await api.deleteProduct(id);
      toast({ title: 'Product deleted' });
      load(); loadProducts();
    } catch (e) {
      toast({ title: 'Delete failed', description: e?.response?.data?.detail });
    }
  };

  const filtered = (arr, keys) => {
    if (!q.trim()) return arr;
    const s = q.toLowerCase();
    return arr.filter((it) => keys.some((k) => String(it[k] || '').toLowerCase().includes(s)));
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="bg-[#fbf7ec] min-h-[80vh]">
      {/* Admin header */}
      <div className="bg-[#0f3d2e] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-[#e6b64c]" />
            <div>
              <div className="font-serif text-lg">Admin Panel</div>
              <div className="text-xs text-[#e6b64c]">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={load} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg">Refresh</button>
            <button onClick={logout} className="text-xs bg-[#c84a3f] hover:bg-[#a83a2f] px-3 py-2 rounded-lg flex items-center gap-1"><LogOut size={14} /> Logout</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${tab === t.id ? 'border-[#e6b64c] text-[#e6b64c]' : 'border-transparent text-white/70 hover:text-white'}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading && (
          <div className="py-10 text-center text-[#8a7a5a]"><Loader2 className="animate-spin inline mr-2" /> Loading...</div>
        )}

        {/* DASHBOARD */}
        {tab === 'dashboard' && !loading && stats && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Users} label="Total Users" val={stats.users} color="#0f3d2e" />
              <StatCard icon={ShoppingBag} label="Total Orders" val={stats.orders} color="#0a7a3f" />
              <StatCard icon={Package} label="Products" val={stats.products} color="#c84a3f" />
              <StatCard icon={IndianRupee} label="Revenue" val={`₹${(stats.revenue || 0).toLocaleString()}`} color="#d4a238" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
              <div className="bg-white border border-[#ede4cf] rounded-xl p-5">
                <h3 className="font-serif text-lg text-[#0f3d2e] mb-3">Recent Orders</h3>
                <div className="space-y-2">
                  {orders.slice(0, 5).map((o) => (
                    <div key={o.id} className="flex items-center gap-3 py-2 border-b border-[#f0e8d5] last:border-0">
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm text-[#0f3d2e]">{o.orderNumber}</div>
                        <div className="text-xs text-[#8a7a5a]">{o.address?.name} • {o.items?.length} items</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#0f3d2e]">₹{o.total?.toLocaleString()}</div>
                        <div className="text-[10px] text-[#8a7a5a] capitalize">{o.status}</div>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && <div className="text-sm text-[#8a7a5a] py-4 text-center">No orders yet</div>}
                </div>
              </div>

              <div className="bg-white border border-[#ede4cf] rounded-xl p-5">
                <h3 className="font-serif text-lg text-[#0f3d2e] mb-3">Top Users by Points</h3>
                <div className="space-y-2">
                  {[...users].sort((a, b) => (b.rewardPoints || 0) - (a.rewardPoints || 0)).slice(0, 5).map((u) => (
                    <div key={u.id} className="flex items-center gap-3 py-2 border-b border-[#f0e8d5] last:border-0">
                      <div className="w-9 h-9 rounded-full bg-[#faf1dc] flex items-center justify-center text-sm font-serif text-[#0f3d2e]">{u.name?.[0]?.toUpperCase()}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[#0f3d2e] text-sm truncate">{u.name}</div>
                        <div className="text-xs text-[#8a7a5a] truncate">{u.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#0f3d2e]">{u.rewardPoints ?? 0}</div>
                        <div className="text-[10px] text-[#8a7a5a]">pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && !loading && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7a5a]" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..."
                  className="pl-9 pr-4 py-2 border border-[#ded1a8] rounded-lg bg-white text-sm w-64 outline-none focus:border-[#0f3d2e]" />
              </div>
              <button onClick={() => setEditProduct(emptyProduct)}
                className="bg-[#0f3d2e] hover:bg-[#0a2a20] text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <Plus size={16} /> Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered(products, ['name', 'category', 'slug']).map((p) => (
                <div key={p.id} className="bg-white border border-[#ede4cf] rounded-xl overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-white to-[#faf6ec] flex items-center justify-center p-4">
                    <img src={p.images?.[0]} alt={p.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold text-[#0f3d2e] truncate">{p.name}</div>
                        <div className="text-xs text-[#8a7a5a] capitalize">{p.category?.replace(/-/g, ' ')}</div>
                      </div>
                      {p.badge && <span className="text-[9px] font-bold bg-[#c84a3f] text-white px-2 py-1 rounded whitespace-nowrap">{p.badge}</span>}
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-bold text-[#0f3d2e]">₹{p.price?.toLocaleString()}</span>
                      <span className="text-xs text-[#a89573] line-through">₹{p.mrp?.toLocaleString()}</span>
                      <span className="text-xs text-[#0a7a3f]">{p.discount}% off</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#8a7a5a]">
                      <span className="flex items-center gap-1"><Star size={11} className="fill-[#e6b64c] text-[#e6b64c]" />{p.rating}</span>
                      <span>Stock: {p.stock ?? 0}</span>
                      <span className={p.inStock ? 'text-[#0a7a3f]' : 'text-[#c84a3f]'}>{p.inStock ? 'Active' : 'Hidden'}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => setEditProduct(p)} className="flex-1 flex items-center justify-center gap-1 bg-[#0f3d2e] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#0a2a20]">
                        <Edit3 size={12} /> Edit
                      </button>
                      <a href={`/product/${p.slug}`} target="_blank" rel="noreferrer" className="p-2 border border-[#0f3d2e] text-[#0f3d2e] rounded-lg hover:bg-[#faf1dc]" title="View">
                        <ExternalLink size={12} />
                      </a>
                      <button onClick={() => deleteProduct(p.id, p.name)} className="p-2 border border-[#c84a3f] text-[#c84a3f] rounded-lg hover:bg-[#c84a3f] hover:text-white" title="Delete">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {products.length === 0 && <div className="text-center py-10 text-[#8a7a5a]">No products. Click "Add Product" to create.</div>}
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && !loading && (
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7a5a]" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order # or customer..."
                  className="w-full pl-9 pr-4 py-2 border border-[#ded1a8] rounded-lg bg-white text-sm outline-none focus:border-[#0f3d2e]" />
              </div>
            </div>
            <div className="overflow-x-auto bg-white border border-[#ede4cf] rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-[#faf1dc]">
                  <tr>{['Order #', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-[#0f3d2e]">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {filtered(orders, ['orderNumber', 'userEmail']).map((o) => (
                    <tr key={o.id} className="border-t border-[#ede4cf] hover:bg-[#faf6ec]">
                      <td className="px-4 py-3 font-mono text-[#0f3d2e]">{o.orderNumber}</td>
                      <td className="px-4 py-3">
                        <div>{o.address?.name || '—'}</div>
                        <div className="text-xs text-[#8a7a5a]">{o.userEmail}</div>
                      </td>
                      <td className="px-4 py-3">{o.items?.length}</td>
                      <td className="px-4 py-3 font-semibold">₹{o.total?.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="text-xs uppercase font-semibold">{o.paymentMethod}</div>
                        <div className="text-[10px] text-[#8a7a5a]">{o.paymentStatus}</div>
                      </td>
                      <td className="px-4 py-3">
                        <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}
                          className="text-xs border border-[#ded1a8] rounded px-2 py-1 bg-white">
                          {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setDetailOrder(o)} className="text-[#0f3d2e] hover:underline text-xs font-semibold">View</button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && <tr><td colSpan="7" className="text-center py-8 text-[#8a7a5a]">No orders yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === 'users' && !loading && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7a5a]" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name/email..."
                  className="w-full pl-9 pr-4 py-2 border border-[#ded1a8] rounded-lg bg-white text-sm outline-none focus:border-[#0f3d2e]" />
              </div>
            </div>
            <div className="overflow-x-auto bg-white border border-[#ede4cf] rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-[#faf1dc]">
                  <tr>{['Name', 'Email', 'Phone', 'Points', 'Role', 'Joined'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-[#0f3d2e]">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {filtered(users, ['name', 'email', 'phone']).map((u) => (
                    <tr key={u.id} className="border-t border-[#ede4cf] hover:bg-[#faf6ec]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#faf1dc] flex items-center justify-center text-xs font-serif text-[#0f3d2e]">{u.name?.[0]?.toUpperCase()}</div>
                          <span>{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{u.email}</td>
                      <td className="px-4 py-3">{u.phone || '—'}</td>
                      <td className="px-4 py-3 font-semibold text-[#0f3d2e]">{u.rewardPoints ?? 0}</td>
                      <td className="px-4 py-3">{u.isAdmin ? <span className="text-[10px] font-bold bg-[#0f3d2e] text-white px-2 py-1 rounded">ADMIN</span> : 'Customer'}</td>
                      <td className="px-4 py-3 text-xs text-[#8a7a5a]">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {editProduct !== null && (
        <ProductFormModal
          product={editProduct.id ? editProduct : null}
          onClose={() => setEditProduct(null)}
          onSaved={() => { setEditProduct(null); load(); loadProducts(); }}
        />
      )}
      {detailOrder && <OrderDetailModal order={detailOrder} onClose={() => setDetailOrder(null)} onStatusUpdate={updateStatus} />}
    </div>
  );
}
