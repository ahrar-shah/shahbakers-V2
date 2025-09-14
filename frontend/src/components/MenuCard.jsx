import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuCard({ item }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col">
      <img src={item.image || 'https://via.placeholder.com/400x250'} alt={item.title} className="h-40 w-full object-cover rounded"/>
      <h3 className="mt-3 font-semibold">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="font-bold text-lg">₹{item.price}</div>
        <Link to={`/product/${item._id}`} className="px-3 py-1 bg-indigo-600 text-white rounded">View</Link>
      </div>
    </div>
  );
}
