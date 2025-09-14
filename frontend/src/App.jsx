import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminPanel from './pages/AdminPanel';
import LoginRegister from './pages/LoginRegister';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(u);
  }, []);

  return (
    <div className="min-h-screen body-bg">
      <Nav user={user} setUser={setUser} />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout setUser={setUser} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<LoginRegister setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
}
