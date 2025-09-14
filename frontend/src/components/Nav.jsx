import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav({ user, setUser }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const cartCount = JSON.parse(localStorage.getItem('cart') || '[]').length;

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">FoodApp</Link>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            Cart
            <span className="ml-2 px-2 py-1 text-sm bg-gray-100 rounded">{cartCount}</span>
          </Link>
          {user ? (
            <>
              <span>{user.name}</span>
              <button onClick={logout} className="text-sm text-red-500">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
