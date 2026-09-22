import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, Truck, Wallet, Gift, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '../hooks/use-toast';
import { api } from '../lib/api';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const { cartItems, cart, cartSubtotal, cartSavings, clearCart, user, refreshUser } = useApp();
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState('cod');
  const [busy, setBusy] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '', phone: user?.phone || '', email: user?.email || '',
    address: '', city: '', state: '', pincode: '',
  });

  const shipping = cartSubtotal >= 499 ? 0 : 49;
  const redeemValue = Math.floor(pointsToRedeem / 2);
  const maxRedeemValue = Math.floor(cartSubtotal * 0.2);
  const cappedRedeemValue = Math.min(redeemValue, maxRedeemValue);
  const total = Math.max(1, cartSubtotal + shipping - cappedRedeemValue);
  const pointsEarnable = Math.floor(cartSubtotal / 100) * 5;

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    if (cartItems.length === 0 && step !== 3) navigate('/shop');
  }, [cartItems.length, step, navigate]);

  // Live preview from backend when points change
  useEffect(() => {
    if (!user || cart.length === 0) return;
    api.previewOrder({
      items: cart,
      address: { name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '' },
      paymentMethod: payment,
      pointsRedeemed: pointsToRedeem,
    }).then(setPreview).catch(() => {});
  }, [cart, pointsToRedeem, payment, user]);

  const submitAddress = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const placeOrder = async () => {
    setBusy(true);
    try {
      const res = await api.createOrder({
        items: cart,
        address: form,
        paymentMethod: payment,
        pointsRedeemed: pointsToRedeem,
      });
      const order = res.order;

      if (payment === 'cod') {
        setOrderInfo(order);
        clearCart();
        await refreshUser();
        setStep(3);
        toast({ title: 'Order placed!', description: `Order #${order.orderNumber} confirmed.` });
      } else if (payment === 'razorpay') {
        const ok = await loadRazorpayScript();
        if (!ok) throw new Error('Razorpay checkout script failed to load');
        const options = {
          key: res.razorpayKeyId,
          amount: Math.round(order.total * 100),
          currency: 'INR',
          name: 'Aarogya Seva',
          description: `Order #${order.orderNumber}`,
          order_id: order.razorpayOrderId,
          prefill: { name: form.name, email: form.email, contact: form.phone },
          theme: { color: '#0f3d2e' },
          handler: async (rpResp) => {
            try {
              await api.verifyPayment({
                orderId: order.id,
                razorpay_order_id: rpResp.razorpay_order_id,
                razorpay_payment_id: rpResp.razorpay_payment_id,
                razorpay_signature: rpResp.razorpay_signature,
              });
              setOrderInfo(order);
              clearCart();
              await refreshUser();
              setStep(3);
              toast({ title: 'Payment successful!', description: `Order #${order.orderNumber}` });
            } catch (e) {
              toast({ title: 'Payment verification failed', description: 'Please contact support.' });
            }
          },
          modal: {
            ondismiss: () => toast({ title: 'Payment cancelled', description: 'You can retry from your account.' }),
          },
        };
        const rp = new window.Razorpay(options);
        rp.open();
      }
    } catch (e) {
      toast({ title: 'Order failed', description: e?.response?.data?.detail || e.message || 'Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  if (step === 3 && orderInfo) {
    return (
      <div className="min-h-[70vh] bg-[#fbf7ec] flex items-center justify-center px-4 py-12">
        <div className="bg-white border border-[#ede4cf] rounded-2xl p-10 text-center max-w-lg w-full">
          <CheckCircle2 size={64} className="text-[#0a7a3f] mx-auto" />
          <h1 className="font-serif text-3xl text-[#0f3d2e] mt-4">Order Confirmed!</h1>
          <p className="text-[#6a6a6a] mt-2">Thank you for shopping with Aarogya Seva.</p>
          <div className="bg-[#faf1dc] rounded-lg p-4 mt-6">
            <div className="text-xs text-[#8a7a5a]">Order Number</div>
            <div className="font-mono font-bold text-[#0f3d2e] text-lg">#{orderInfo.orderNumber}</div>
            <div className="text-sm text-[#0f3d2e] mt-1">Total paid: ₹{orderInfo.total?.toLocaleString?.()}</div>
          </div>
          {orderInfo.pointsEarned > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#faf1dc] to-[#f4e4b8] px-4 py-2 rounded-full border border-[#e6b64c]/40">
              <Gift size={16} className="text-[#0f3d2e]" />
              <span className="text-[#0f3d2e] font-semibold">+{orderInfo.pointsEarned} Aarogya Points earned!</span>
            </div>
          )}
          <p className="text-sm text-[#6a6a6a] mt-4">Confirmation email and WhatsApp update coming shortly.</p>
          <div className="flex gap-3 mt-6">
            <button onClick={() => navigate('/track-order')} className="flex-1 border border-[#0f3d2e] text-[#0f3d2e] font-semibold py-3 rounded-lg hover:bg-[#0f3d2e] hover:text-white transition">Track Order</button>
            <button onClick={() => navigate('/')} className="flex-1 bg-[#0f3d2e] text-white font-semibold py-3 rounded-lg hover:bg-[#0a2a20] transition">Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Checkout | Aarogya Seva" description="Secure checkout" noindex />
    <div className="bg-[#fbf7ec] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-serif text-3xl text-[#0f3d2e]">Checkout</h1>

        <div className="flex items-center gap-3 mt-6 text-sm">
          {[{ n: 1, l: 'Address' }, { n: 2, l: 'Payment' }].map((s) => (
            <React.Fragment key={s.n}>
              <div className={`flex items-center gap-2 ${step >= s.n ? 'text-[#0f3d2e] font-semibold' : 'text-[#a89573]'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= s.n ? 'bg-[#0f3d2e] text-white' : 'bg-[#ede4cf] text-[#a89573]'}`}>{s.n}</div>
                {s.l}
              </div>
              {s.n === 1 && <div className={`h-px w-10 ${step >= 2 ? 'bg-[#0f3d2e]' : 'bg-[#ede4cf]'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mt-8">
          <div>
            {step === 1 && (
              <form onSubmit={submitAddress} className="bg-white border border-[#ede4cf] rounded-xl p-6 space-y-4">
                <h3 className="font-serif text-xl text-[#0f3d2e] mb-2">Delivery Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ['Full Name', 'name', 'text'],
                    ['Phone Number', 'phone', 'tel'],
                    ['Email', 'email', 'email'],
                    ['City', 'city', 'text'],
                    ['State', 'state', 'text'],
                    ['Pincode', 'pincode', 'text'],
                  ].map(([label, key, type]) => (
                    <div key={key}>
                      <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">{label}</label>
                      <input required type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Full Address</label>
                    <textarea required rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#0f3d2e] text-white font-semibold py-3.5 rounded-lg hover:bg-[#0a2a20]">Continue to Payment</button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {/* Reward Points redemption */}
                {user?.rewardPoints > 0 && (
                  <div className="bg-gradient-to-r from-[#faf1dc] to-[#f4e4b8] border border-[#e6b64c]/40 rounded-xl p-5">
                    <div className="flex items-center gap-2">
                      <Gift size={20} className="text-[#0f3d2e]" />
                      <h3 className="font-semibold text-[#0f3d2e]">Use Aarogya Points</h3>
                    </div>
                    <p className="text-xs text-[#8a7a5a] mt-1">You have <b>{user.rewardPoints}</b> points • 100 pts = ₹50 • Max 20% off (up to ₹{maxRedeemValue})</p>
                    <div className="flex items-center gap-3 mt-3">
                      <input type="range" min="0" max={Math.min(user.rewardPoints, maxRedeemValue * 2)} step="10"
                        value={pointsToRedeem} onChange={(e) => setPointsToRedeem(parseInt(e.target.value))}
                        className="flex-1 accent-[#0f3d2e]" />
                      <span className="text-sm font-semibold text-[#0f3d2e] w-24 text-right">{pointsToRedeem} pts</span>
                    </div>
                    {cappedRedeemValue > 0 && <p className="text-xs text-[#0a7a3f] font-semibold mt-1">₹{cappedRedeemValue} discount will apply</p>}
                  </div>
                )}

                <div className="bg-white border border-[#ede4cf] rounded-xl p-6">
                  <h3 className="font-serif text-xl text-[#0f3d2e] mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive', icon: Truck },
                      { id: 'razorpay', label: 'UPI / Cards / Wallets', desc: 'Google Pay, PhonePe, Paytm, Visa, Mastercard (via Razorpay)', icon: CreditCard },
                    ].map((p) => (
                      <label key={p.id} className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${payment === p.id ? 'border-[#0f3d2e] bg-[#faf1dc]' : 'border-[#ede4cf]'}`}>
                        <input type="radio" name="pay" checked={payment === p.id} onChange={() => setPayment(p.id)} className="accent-[#0f3d2e]" />
                        <p.icon size={22} className="text-[#0f3d2e]" />
                        <div>
                          <div className="font-semibold text-[#0f3d2e]">{p.label}</div>
                          <div className="text-xs text-[#8a7a5a]">{p.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(1)} disabled={busy} className="flex-1 border border-[#0f3d2e] text-[#0f3d2e] font-semibold py-3 rounded-lg disabled:opacity-50">Back</button>
                    <button onClick={placeOrder} disabled={busy} className="flex-1 bg-[#e6b64c] hover:bg-[#d4a238] text-[#0f3d2e] font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60">
                      {busy && <Loader2 size={16} className="animate-spin" />}
                      {payment === 'cod' ? 'Place Order' : 'Pay Now'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white border border-[#ede4cf] rounded-xl p-6 h-fit sticky top-24">
            <h3 className="font-serif text-lg text-[#0f3d2e] mb-4">Summary</h3>
            <div className="space-y-3 max-h-56 overflow-auto pr-2">
              {cartItems.map((i) => (
                <div key={i.id} className="flex gap-3 text-sm">
                  <img src={i.images[0]} alt={i.name} className="w-12 h-12 object-contain bg-[#faf6ec] rounded p-1" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[#0f3d2e] font-medium line-clamp-1">{i.name}</div>
                    <div className="text-xs text-[#8a7a5a]">Qty {i.qty}</div>
                  </div>
                  <div className="text-[#0f3d2e] font-semibold">₹{(i.price * i.qty).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#ede4cf] mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Subtotal</span><span>₹{cartSubtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Savings</span><span className="text-[#0a7a3f]">- ₹{cartSavings.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              {cappedRedeemValue > 0 && (
                <div className="flex justify-between"><span className="text-[#6a6a6a]">Points Discount</span><span className="text-[#0a7a3f]">- ₹{cappedRedeemValue}</span></div>
              )}
              <div className="flex justify-between text-base border-t border-[#ede4cf] pt-2 mt-2"><span className="font-semibold text-[#0f3d2e]">Total</span><span className="font-bold text-[#0f3d2e]">₹{total.toLocaleString()}</span></div>
              {pointsEarnable > 0 && (
                <div className="flex items-center gap-1.5 text-xs bg-[#faf1dc] p-2 rounded text-[#0f3d2e]"><Gift size={12} /> You will earn <b>+{pointsEarnable} points</b> on this order</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
