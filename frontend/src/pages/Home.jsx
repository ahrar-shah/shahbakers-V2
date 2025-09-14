import React, { useEffect, useState } from 'react';
import API from '../api/api';
import MenuCard from '../components/MenuCard';

export default function Home() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    API.getMenu().then(res => setItems(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(it => <MenuCard key={it._id} item={it} />)}
      </div>
    </div>
  );
}
