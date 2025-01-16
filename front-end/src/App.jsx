/* eslint-disable no-unused-vars */
import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import bannermens from './assets/bannermens.png';
import bannerwomens from './assets/bannerwomens.png';
import bannerkids from './assets/bannerkids.png';
import Credentials from './pages/Credentials';

// Import Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUpload from './components/AdminUpload';
import AdminOverview from './components/AdminOverview';

const App = () => {
  return (
    <main className="overflow-hidden w-full">
      <Header />
      <h1>text</h1>
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/mens" element={<Category banner={bannermens} category="men" />} />
        <Route path="/womens" element={<Category banner={bannerwomens} category="women" />} />
        <Route path="/kids" element={<Category banner={bannerkids} category="kid" />} />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart-page" element={<Cart />} />
        <Route path="/login" element={<Credentials />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/upload" element={<AdminUpload />} />
        <Route path="/admin/overview" element={<AdminOverview />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
