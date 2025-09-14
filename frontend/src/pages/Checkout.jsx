import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ setUser }) {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) return alert('Cart empty');
    const items = cart.map(c => ({ menuItem: c.menuItem, quantity: c.quantity }));
    setLoading(true);
    try {
      const res = await API.createOrder({ items, address, phone });
      localStorage.removeItem('cart');
      alert('Order placed!');
      nav('/orders');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Order failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Address</label>
          <textarea value={address} onChange={e=>setAddress(e.target.value)} className="w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block text-sm">Phone</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full border rounded p-2" required />
        </div>
        <button disabled={loading} type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">
          {loading ? 'Placing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
