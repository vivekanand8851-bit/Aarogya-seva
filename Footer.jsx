import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { BRAND_LOGO } from '../mock/mockData';

export default function Footer() {
  return (
    <footer className="bg-[#0b2a20] text-[#e8dcc0] mt-20">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={BRAND_LOGO} alt="Aarogya Seva" className="w-16 h-16 object-contain bg-white/95 rounded-full p-1" />
              <div>
                <div className="font-serif text-lg text-white">Aarogya Seva</div>
                <div className="text-[10px] tracking-[3px] text-[#e6b64c]">AAPKI SEHAT · HAMARI SEVA</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#c4b48c]">
              High-quality Ayurvedic supplements crafted for daily wellness, boosting immunity,
              energy, and overall health with trusted, natural ingredients.
            </p>
            <div className="flex items-center gap-2 mt-5 text-xs">
              <ShieldCheck size={14} className="text-[#e6b64c]" />
              <span>AYUSH Certified · Made in India</span>
            </div>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#3a5a4a] flex items-center justify-center hover:bg-[#e6b64c] hover:text-[#0f3d2e] hover:border-[#e6b64c] transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-[#e6b64c]">All Products</Link></li>
              <li><Link to="/shop?category=vitamin-supplements" className="hover:text-[#e6b64c]">Vitamin Supplements</Link></li>
              <li><Link to="/shop?category=immunity" className="hover:text-[#e6b64c]">Immunity Boosters</Link></li>
              <li><Link to="/shop?category=mens-wellness" className="hover:text-[#e6b64c]">Men's Wellness</Link></li>
              <li><Link to="/shop?category=digestion" className="hover:text-[#e6b64c]">Digestive Health</Link></li>
              <li><Link to="/shop?category=bone-joint" className="hover:text-[#e6b64c]">Bone &amp; Joint</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[#e6b64c]">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-[#e6b64c]">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-[#e6b64c]">Contact</Link></li>
              <li><Link to="/consult" className="hover:text-[#e6b64c]">Free Consultation</Link></li>
              <li><Link to="/track-order" className="hover:text-[#e6b64c]">Track Order</Link></li>
              <li><Link to="/policies" className="hover:text-[#e6b64c]">Policies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={15} className="text-[#e6b64c] mt-0.5" />
                <a href="tel:+918470807059" className="hover:text-[#e6b64c]">+91 8470807059</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="text-[#e6b64c] mt-0.5" />
                <a href="mailto:aarogyaseva.info@gmail.com" className="hover:text-[#e6b64c] break-all">aarogyaseva.info@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-[#e6b64c] mt-0.5 flex-shrink-0" />
                <span className="text-[#c4b48c] leading-relaxed">Ground Floor, 77, Dadri,<br />Gautam Buddha Nagar,<br />Uttar Pradesh 203207</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#1e3d31] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8a9a90]">
          <div>© 2025 Aarogya Seva. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/policies" className="hover:text-[#e6b64c]">Privacy Policy</Link>
            <Link to="/policies" className="hover:text-[#e6b64c]">Terms</Link>
            <Link to="/policies" className="hover:text-[#e6b64c]">Shipping</Link>
            <Link to="/policies" className="hover:text-[#e6b64c]">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
