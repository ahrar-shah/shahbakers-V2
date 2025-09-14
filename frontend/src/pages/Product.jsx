import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function Product() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);
  const nav = useNavigate();

  useEffect(() => {
    API.getMenuItem(id).then(res => setItem(res.data)).catch(console.error);
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exists = cart.find(c => c.menuItem === id);
    if (exists) {
      exists.quantity += qty;
    } else {
      cart.push({ menuItem: id, quantity: qty, title: item.title, price: item.price });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    nav('/cart');
  };

  if (!item) return <div>Loading...</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <img src={item.image || 'https://via.placeholder.com/800x400'} alt={item.title} className="w-full rounded"/>
        <h2 className="text-2xl font-bold mt-4">{item.title}</h2>
        <p className="mt-2 text-gray-700">{item.description}</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-2xl font-bold">₹{item.price}</div>
        <div className="mt-4">
          <label>Quantity</label>
          <input type="number" value={qty} min="1" onChange={e=>setQty(Number(e.target.value))} className="w-full border rounded px-2 py-1 mt-1"/>
        </div>
        <button onClick={addToCart} className="w-full mt-4 py-2 bg-indigo-600 text-white rounded">Add to Cart</button>
      </div>
    </div>
  );
}
