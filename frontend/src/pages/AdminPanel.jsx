import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    API.adminGetOrders().then(res => setOrders(res.data)).catch(console.error);
  }, []);

  const updateStatus = async (id, status) => {
    await API.adminUpdateOrderStatus(id, { status }).then(res => {
      setOrders(prev => prev.map(o => o._id === id ? res.data : o));
    }).catch(console.error);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin — Orders</h1>
      <div className="space-y-4">
        {orders.map(o => (
          <div key={o._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>#{o._id} — {o.user?.email}</div>
              <div>{o.status}</div>
            </div>
            <div className="mt-2">Total: ₹{o.total}</div>
            <div className="mt-2 space-x-2">
              <button onClick={()=>updateStatus(o._id, 'preparing')} className="px-2 py-1 bg-yellow-300 rounded">Preparing</button>
              <button onClick={()=>updateStatus(o._id, 'on_the_way')} className="px-2 py-1 bg-indigo-300 rounded">On the way</button>
              <button onClick={()=>updateStatus(o._id, 'delivered')} className="px-2 py-1 bg-green-300 rounded">Delivered</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
