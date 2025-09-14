import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const updateQty = (idx, val) => {
    const c = [...cart];
    c[idx].quantity = Math.max(1, Number(val));
    setCart(c);
    localStorage.setItem('cart', JSON.stringify(c));
  };

  const remove = (idx) => {
    const c = [...cart];
    c.splice(idx,1);
    setCart(c);
    localStorage.setItem('cart', JSON.stringify(c));
  };

  const total = cart.reduce((s,i) => s + i.price * i.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div>
          <p>Cart is empty — <Link to="/" className="text-indigo-600">browse menu</Link></p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((c, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white p-4 rounded shadow">
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-gray-600">₹{c.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" value={c.quantity} min="1" onChange={e=>updateQty(idx, e.target.value)} className="w-20 border rounded px-2 py-1"/>
                  <button onClick={()=>remove(idx)} className="text-red-500">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-white rounded shadow flex justify-between items-center">
            <div>Total: <span className="font-bold text-xl">₹{total}</span></div>
            <button onClick={()=>nav('/checkout')} className="px-4 py-2 bg-indigo-600 text-white rounded">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
