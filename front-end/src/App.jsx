/* eslint-disable no-unused-vars */
import Header from './components/Header';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useNavigation, createBrowserRouter, RouterProvider, useLocation, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

//Components
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Credentials from './pages/Credentials';
import Profile from './components/Profile';

// Banner Imports
import bannermens from './assets/bannermens.png';
import bannerwomens from './assets/bannerwomens.png';
import bannerkids from './assets/bannerkids.png';

// Import Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUpload from './components/AdminUpload';
import AdminOverview from './components/AdminOverview';
import LoadingSpinner from './components/LoadingSpinner';
import Logout from './components/Logout';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // ✅ Check login status on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  // ✅ Show spinner for 2 seconds when route changes
  useEffect(() => {
    setIsLoading(true); // Start loading

    const timer = setTimeout(() => {
      setIsLoading(false); // Hide spinner after 2 seconds
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [location.pathname]); // Runs every time the URL changes

  return (
    <main className="overflow-hidden w-full">
      {/* 🔥 Show Loading Spinner Above Header */}
      {isLoading && <LoadingSpinner />}

      {/* Hide Header on Logout/Login pages */}
      {!isLoading && location.pathname !== "/logout" && location.pathname !== "/login" && (
        <Header isLogin={isLogin} setIsLogin={setIsLogin} setIsLoading={setIsLoading} />
      )}

      {/* Content Section */}
      {!isLoading && (
        <div className="relative">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/mens" element={<Category banner={bannermens} category="men" />} />
            <Route path="/womens" element={<Category banner={bannerwomens} category="women" />} />
            <Route path="/kids" element={<Category banner={bannerkids} category="kid" />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:productId" element={<Product />} />

            {/* 🔒 Redirect logged-in users away from login page */}
            <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Credentials setIsLogin={setIsLogin} setIsLoading={setIsLoading} />} />
            <Route path="/logout" element={<Logout />} />

            {/* 🔒 Protected Routes */}
            <Route element={<ProtectedRoute isLogin={isLogin} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart-page" element={<Cart />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/upload" element={<AdminUpload />} />
            <Route path="/admin/overview" element={<AdminOverview />} />
          </Routes>

          {/* Hide Footer on Logout/Login pages */}
          {location.pathname !== "/logout" && location.pathname !== "/login" && <Footer />}
        </div>
      )}
    </main>
  );
};

export default App;
