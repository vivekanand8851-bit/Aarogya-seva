import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Leaf, ShieldCheck, Award, Users, Sparkles, Phone, Mail, MapPin, Send, LogIn, LogOut, User as UserIcon, Package, Truck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '../hooks/use-toast';
import SEO from '../components/SEO';

export function AboutPage() {
  return (
    <>
      <SEO title="About Aarogya Seva" description="Learn about Aarogya Seva, our Ayurvedic wellness approach, product transparency and customer support." url="/about" />
    <div className="bg-[#fbf7ec]">
      <section className="relative h-[380px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1492552296703-4ec0a2fb3715?crop=entropy&cs=srgb&fm=jpg&w=1600&q=85" alt="herbs" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2a20]/85 to-[#0b2a20]/50" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center">
          <div>
            <span className="text-xs tracking-[4px] text-[#e6b64c] uppercase">About Us</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white mt-3">Rooted in Ayurvedic Tradition,<br />Clear About What We Offer</h1>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-lg text-[#3a3a3a] leading-relaxed">Aarogya Seva is built around a simple idea: make Ayurvedic wellness products easier to understand and compare. We focus on traditional herbal ingredients, clear product information and a straightforward online buying experience.</p>
        <p className="text-[#4a4a4a] leading-relaxed mt-4">We aim to present each product with its ingredients, serving information and practical buying guidance clearly. Traditional use is described as traditional use, while modern health claims should be evaluated separately and responsibly.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Leaf, num: 'Ayurveda', label: 'Traditional knowledge' },
          { icon: Users, num: 'Clear', label: 'Product information' },
          { icon: Award, num: 'Online', label: 'Easy ordering' },
          { icon: ShieldCheck, num: 'Support', label: 'Customer assistance' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[#ede4cf] rounded-xl p-6 text-center">
            <s.icon size={28} className="text-[#e6b64c] mx-auto" />
            <div className="font-serif text-3xl text-[#0f3d2e] mt-3">{s.num}</div>
            <div className="text-xs text-[#8a7a5a] mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs tracking-[4px] text-[#8a7a5a] uppercase">Our Values</span>
          <h2 className="font-serif text-3xl text-[#0f3d2e] mt-2">What We Stand For</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, title: 'Authenticity', desc: 'We respect traditional Ayurvedic knowledge while avoiding unsupported promises.' },
            { icon: ShieldCheck, title: 'Transparency', desc: 'We aim to provide clear ingredient, serving and product information.' },
            { icon: Leaf, title: 'Sustainability', desc: 'We continue to improve sourcing, packaging and product information as the brand grows.' },
          ].map((v, i) => (
            <div key={i} className="bg-white border border-[#ede4cf] rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#faf1dc] flex items-center justify-center">
                <v.icon size={22} className="text-[#0f3d2e]" />
              </div>
              <h3 className="font-serif text-xl text-[#0f3d2e] mt-4">{v.title}</h3>
              <p className="text-sm text-[#6a6a6a] mt-2 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}

export function ContactPage() {
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      'Aarogya Seva Contact Request',
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Message: ${data.get('message') || ''}`,
    ].join('\\n');
    window.open(`https://wa.me/918470807059?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    toast({ title: 'WhatsApp opened', description: 'Please send the pre-filled message to contact Aarogya Seva.' });
    e.currentTarget.reset();
  };
  return (
    <>
      <SEO title="Contact Aarogya Seva" description="Contact Aarogya Seva for product questions, order support and customer assistance across India." url="/contact" />
    <div className="bg-[#fbf7ec] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs tracking-[4px] text-[#8a7a5a] uppercase">Get In Touch</span>
          <h1 className="font-serif text-4xl text-[#0f3d2e] mt-2">We're Here to Help</h1>
          <div className="w-16 h-[3px] bg-[#e6b64c] mx-auto mt-4 rounded" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={submit} className="bg-white border border-[#ede4cf] rounded-xl p-6 space-y-4">
              {['Name', 'Email', 'Phone'].map((f) => (
                <div key={f}>
                  <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">{f}</label>
                  <input required name={f.toLowerCase()} type={f === 'Email' ? 'email' : 'text'} className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Message</label>
                <textarea required name="message" rows={5} className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
              </div>
              <button type="submit" className="w-full bg-[#0f3d2e] hover:bg-[#0a2a20] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"><Send size={16} /> Send Message</button>
            </form>
          </div>
          <div className="space-y-4">
            {[
              { icon: Phone, title: 'Call Us', line1: '+91 8470807059', line2: 'Mon–Sun • 24/7 support' },
              { icon: Mail, title: 'Email Us', line1: 'aarogyaseva.info@gmail.com', line2: 'We reply within 24 hours' },
              { icon: MapPin, title: 'Visit Us', line1: 'Ground Floor, 77, Dadri', line2: 'Gautam Buddha Nagar, UP 203207' },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-[#ede4cf] rounded-xl p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#faf1dc] flex items-center justify-center flex-shrink-0">
                  <c.icon size={20} className="text-[#0f3d2e]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0f3d2e]">{c.title}</h3>
                  <p className="text-sm text-[#3a3a3a] mt-1">{c.line1}</p>
                  <p className="text-xs text-[#8a7a5a]">{c.line2}</p>
                </div>
              </div>
            ))}
            <a href="https://wa.me/918470807059" target="_blank" rel="noreferrer" className="block bg-[#25D366] text-white text-center font-semibold py-4 rounded-xl hover:bg-[#1eb257] transition">Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export function ConsultPage() {
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      'Aarogya Seva Wellness Consultation Request',
      `Name: ${data.get('name') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Age: ${data.get('age') || ''}`,
      `Concern: ${data.get('concern') || ''}`,
    ].join('\\n');
    window.open(`https://wa.me/918470807059?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    toast({ title: 'WhatsApp opened', description: 'Please send the pre-filled request to continue.' });
    e.currentTarget.reset();
  };
  return (
    <>
      <SEO title="Ayurvedic Wellness Consultation | Aarogya Seva" description="Learn more about Aarogya Seva Ayurvedic wellness consultation and product guidance." url="/consult" />
    <div className="bg-[#fbf7ec] py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-xs tracking-[4px] text-[#8a7a5a] uppercase">Free Consultation</span>
          <h1 className="font-serif text-4xl text-[#0f3d2e] mt-2">Talk to an Ayurvedic Expert</h1>
          <p className="text-[#6a6a6a] mt-3">Share your wellness questions and product-related concerns with the Aarogya Seva team via WhatsApp.</p>
        </div>
        <form onSubmit={submit} className="bg-white border border-[#ede4cf] rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Full Name</label><input required name="name" className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" /></div>
            <div><label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Phone</label><input required name="phone" type="tel" className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" /></div>
            <div><label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Age</label><input required name="age" type="number" className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" /></div>
            <div><label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Primary Concern</label>
              <select required name="concern" className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]">
                <option value="">Select...</option>
                <option>Immunity</option>
                <option>Digestion</option>
                <option>Stress &amp; Sleep</option>
                <option>Bone &amp; Joint</option>
                <option>Men's Wellness</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div><label className="text-xs font-semibold text-[#4a4a4a] mb-1 block">Describe your concern</label><textarea rows={4} className="w-full border border-[#ded1a8] rounded-lg px-3 py-2.5 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" /></div>
          <button type="submit" className="w-full bg-[#e6b64c] hover:bg-[#d4a238] text-[#0f3d2e] font-bold py-3.5 rounded-lg">Book Free Consultation</button>
        </form>
      </div>
    </div>
    </>
  );
}

export function LoginPage() {
  const { user, login, signup, logout } = useApp();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', identifier: '', email: '', phone: '', password: '' });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/account';

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const u = mode === 'login'
        ? await login(form.identifier, form.password)
        : await signup(form.name, form.email, form.password, form.phone);
      toast({ title: mode === 'login' ? 'Welcome back!' : 'Account created!', description: `Hi ${u.name} — you have ${u.rewardPoints} reward points.` });
      navigate(redirectTo);
    } catch (err) {
      toast({ title: 'Error', description: err?.response?.data?.detail || 'Failed. Try again.' });
    } finally {
      setBusy(false);
    }
  };

  if (user) {
    return (
      <div className="bg-[#fbf7ec] py-16 min-h-[60vh]">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white border border-[#ede4cf] rounded-xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0f3d2e] text-white flex items-center justify-center mx-auto text-2xl font-serif">{user.name?.[0]?.toUpperCase()}</div>
            <h2 className="font-serif text-2xl text-[#0f3d2e] mt-4">Hi, {user.name}</h2>
            <p className="text-sm text-[#6a6a6a]">{user.email}</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#faf1dc] px-4 py-2 rounded-full">
              <span className="text-[#0f3d2e] font-bold">{user.rewardPoints}</span>
              <span className="text-xs text-[#8a7a5a]">Aarogya Points</span>
            </div>
            <div className="flex gap-3 mt-6">
              <Link to="/account" className="flex-1 border border-[#0f3d2e] text-[#0f3d2e] font-semibold py-2.5 rounded-lg">My Account</Link>
              <button onClick={logout} className="flex-1 bg-[#c84a3f] text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2"><LogOut size={16} /> Logout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Login | Aarogya Seva" description="Customer account area for Aarogya Seva." noindex />
    <div className="bg-[#fbf7ec] py-16 min-h-[70vh]">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white border border-[#ede4cf] rounded-xl p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#faf1dc] flex items-center justify-center mx-auto"><LogIn size={22} className="text-[#0f3d2e]" /></div>
            <h1 className="font-serif text-2xl text-[#0f3d2e] mt-3">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-sm text-[#6a6a6a] mt-1">{mode === 'login' ? 'Sign in to continue' : 'Get 100 welcome points on signup'}</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' ? (
              <>
                <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-[#ded1a8] rounded-lg px-3 py-3 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
                <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-[#ded1a8] rounded-lg px-3 py-3 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
                <input required type="tel" placeholder="Mobile Number (10 digits)" pattern="[0-9]{10}" maxLength={10} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-[#ded1a8] rounded-lg px-3 py-3 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
              </>
            ) : (
              <input required type="text" placeholder="Email or Mobile Number" value={form.identifier} onChange={(e) => setForm({ ...form, identifier: e.target.value })} className="w-full border border-[#ded1a8] rounded-lg px-3 py-3 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
            )}
            <input required type="password" placeholder="Password (min 6 chars)" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border border-[#ded1a8] rounded-lg px-3 py-3 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
            <button disabled={busy} type="submit" className="w-full bg-[#0f3d2e] text-white font-semibold py-3 rounded-lg hover:bg-[#0a2a20] disabled:opacity-60">{busy ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}</button>
          </form>
          <p className="text-center text-sm text-[#6a6a6a] mt-4">
            {mode === 'login' ? "New here?" : 'Have an account?'}{' '}
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-[#0f3d2e] font-semibold hover:underline">{mode === 'login' ? 'Create Account' : 'Login'}</button>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export function AccountPage() {
  const { user, logout } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    if (!user) return;
    import('../lib/api').then(({ api }) =>
      api.myOrders().then(setOrders).catch(() => {}).finally(() => setLoading(false))
    );
  }, [user]);
  if (!user) return <LoginPage />;
  return (
    <>
      <SEO title="My Account | Aarogya Seva" description="Customer account area for Aarogya Seva." noindex />
    <div className="bg-[#fbf7ec] py-10 min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white border border-[#ede4cf] rounded-xl p-6 flex flex-wrap items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#0f3d2e] text-white flex items-center justify-center text-2xl font-serif">{user.name?.[0]?.toUpperCase()}</div>
          <div className="flex-1 min-w-[200px]">
            <h2 className="font-serif text-2xl text-[#0f3d2e]">Hi, {user.name}</h2>
            <p className="text-sm text-[#6a6a6a]">{user.email}{user.phone ? ` • ${user.phone}` : ''}</p>
          </div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#faf1dc] to-[#f4e4b8] px-4 py-3 rounded-lg border border-[#e6b64c]/40">
            <div>
              <div className="text-xs text-[#8a7a5a] font-semibold">Aarogya Points</div>
              <div className="text-xl font-bold text-[#0f3d2e]">{user.rewardPoints ?? 0}</div>
              <div className="text-[10px] text-[#8a7a5a]">Worth ₹{Math.floor((user.rewardPoints ?? 0) / 2)}</div>
            </div>
          </div>
          <button onClick={logout} className="text-[#c84a3f] hover:underline flex items-center gap-1 text-sm"><LogOut size={16} /> Logout</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Link to="/wishlist" className="bg-white border border-[#ede4cf] rounded-xl p-5 hover:shadow-md transition"><UserIcon size={22} className="text-[#0f3d2e]" /><h3 className="font-semibold text-[#0f3d2e] mt-3">Wishlist</h3><p className="text-xs text-[#8a7a5a] mt-1">Saved products</p></Link>
          <Link to="/track-order" className="bg-white border border-[#ede4cf] rounded-xl p-5 hover:shadow-md transition"><Truck size={22} className="text-[#0f3d2e]" /><h3 className="font-semibold text-[#0f3d2e] mt-3">Track Order</h3><p className="text-xs text-[#8a7a5a] mt-1">Enter order number</p></Link>
          {user.isAdmin && <Link to="/admin" className="bg-[#0f3d2e] text-white rounded-xl p-5 hover:opacity-90 transition"><Package size={22} /><h3 className="font-semibold mt-3">Admin Dashboard</h3><p className="text-xs text-[#e6b64c] mt-1">Manage store</p></Link>}
        </div>

        <div className="mt-8">
          <h3 className="font-serif text-2xl text-[#0f3d2e] mb-4">My Orders</h3>
          {loading ? (
            <div className="text-center py-8 text-[#8a7a5a]">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="bg-white border border-[#ede4cf] rounded-xl p-10 text-center text-[#8a7a5a]">No orders yet. <Link to="/shop" className="text-[#0f3d2e] font-semibold underline">Shop now</Link></div>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="bg-white border border-[#ede4cf] rounded-xl p-4 flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-xs text-[#8a7a5a]">Order #{o.orderNumber}</div>
                    <div className="font-semibold text-[#0f3d2e]">{o.items.length} item(s) \u2022 \u20b9{o.total.toLocaleString()}</div>
                    <div className="text-xs text-[#6a6a6a]">{new Date(o.createdAt).toLocaleDateString()} • {o.paymentMethod.toUpperCase()} • <span className="capitalize">{o.status}</span></div>
                  </div>
                  {o.pointsEarned > 0 && <div className="text-xs bg-[#faf1dc] text-[#0f3d2e] px-3 py-1.5 rounded-full font-semibold">+{o.pointsEarned} pts</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { api } = await import('../lib/api');
      const o = await api.getOrder(orderId.trim().toUpperCase());
      setStatus({ id: o.orderNumber, total: o.total, steps: o.trackingSteps });
    } catch (err) {
      setError(err?.response?.data?.detail || 'Order not found');
      setStatus(null);
    }
  };
  return (
    <>
      <SEO title="Track Order | Aarogya Seva" description="Customer account area for Aarogya Seva." noindex />
    <div className="bg-[#fbf7ec] py-12 min-h-[60vh]">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="font-serif text-3xl text-[#0f3d2e] text-center">Track Your Order</h1>
        <form onSubmit={submit} className="bg-white border border-[#ede4cf] rounded-xl p-6 mt-6 flex gap-3">
          <input required value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Enter Order # (e.g., AS12345678)" className="flex-1 border border-[#ded1a8] rounded-lg px-3 py-3 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]" />
          <button type="submit" className="bg-[#0f3d2e] text-white font-semibold px-6 rounded-lg">Track</button>
        </form>
        {error && <div className="mt-4 text-center text-[#c84a3f]">{error}</div>}
        {status && (
          <div className="bg-white border border-[#ede4cf] rounded-xl p-6 mt-4">
            <div className="text-sm text-[#8a7a5a]">Order #</div>
            <div className="font-mono text-lg text-[#0f3d2e] font-bold">{status.id}</div>
            <div className="text-sm text-[#0f3d2e] mt-1">Total: ₹{status.total?.toLocaleString?.() ?? status.total}</div>
            <div className="mt-6 space-y-4">
              {status.steps.map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 ${s.done ? 'bg-[#0a7a3f]' : 'bg-[#ded1a8]'}`} />
                  <div className="flex-1">
                    <div className={`font-semibold ${s.done ? 'text-[#0f3d2e]' : 'text-[#a89573]'}`}>{s.label}</div>
                    {s.date && <div className="text-xs text-[#8a7a5a]">{new Date(s.date).toLocaleString()}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export function PoliciesPage() {
  return (
    <>
      <SEO title="Aarogya Seva Policies" description="Read Aarogya Seva shipping, returns, privacy and customer policies." url="/policies" />
    <div className="bg-[#fbf7ec] py-12">
      <div className="max-w-3xl mx-auto px-4 prose text-[#3a3a3a]">
        <h1 className="font-serif text-4xl text-[#0f3d2e]">Policies</h1>
        <h2 className="font-serif text-2xl text-[#0f3d2e] mt-8">Shipping Policy</h2>
        <p>We ship pan-India via reputed courier partners. Orders are dispatched within 24-48 hours. Standard delivery takes 3-7 business days.</p>
        <h2 className="font-serif text-2xl text-[#0f3d2e] mt-6">Return Policy</h2>
        <p>Unopened products can be returned within 7 days of delivery for a full refund. Opened products are eligible only for damaged or wrong items.</p>
        <h2 className="font-serif text-2xl text-[#0f3d2e] mt-6">Privacy Policy</h2>
        <p>We respect your privacy. Personal data is collected only for order processing and never shared with third parties without consent.</p>
        <h2 className="font-serif text-2xl text-[#0f3d2e] mt-6">Terms &amp; Conditions</h2>
        <p>By purchasing from Aarogya Seva, you agree to our terms. Products are dietary supplements and not intended to diagnose, treat, cure or prevent any disease.</p>
      </div>
    </div>
    </>
  );
}
