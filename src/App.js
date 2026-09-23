import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Announcement from './components/Announcement';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import AdminPage from './pages/AdminPage';
import { AboutPage, ContactPage, ConsultPage, LoginPage, AccountPage, TrackOrderPage, PoliciesPage } from './pages/StaticPages';
import { BlogListPage, BlogDetailPage } from './pages/BlogPage';
import HerbalLandingPage from './pages/HerbalLandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Announcement />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/ayurvedic" element={<HerbalLandingPage type="hub" />} />
            <Route path="/aarogya-seva-ayurveda" element={<HerbalLandingPage type="brand" />} />
            <Route path="/ayurvedic/ashwagandha" element={<HerbalLandingPage type="ashwagandha" />} />
            <Route path="/ayurvedic/shilajit" element={<HerbalLandingPage type="shilajit" />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/ayurvedic-products/:seoSlug" element={<ProductDetailPage seoUrl />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/consult" element={<ConsultPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </AppProvider>
    </BrowserRouter>
  );
}
