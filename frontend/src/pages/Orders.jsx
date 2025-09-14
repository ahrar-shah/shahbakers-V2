import React, { useEffect, useState } from 'react';
import API from '../api/api';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    API.getMyOrders().then(res => setOrders(res.data)).catch(err => {
      console.error(err);
      setOrders([]);
    });
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        {orders.length === 0 ? <p>No orders yet</p> : (
          <div className="space-y-4">
            {orders.map(o => (
              <div key={o._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between">
                  <div>Order #{o._id}</div>
                  <div className="font-semibold">{o.status}</div>
                </div>
                <div className="mt-2">Total: ₹{o.total}</div>
                <div className="mt-2 text-sm text-gray-600">Placed: {new Date(o.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
