import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function LoginRegister({ setUser }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name:'', email:'', password:''});
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = mode === 'login' ? await API.login(form) : await API.register(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      nav('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={submit} className="space-y-3">
        {mode === 'register' && (
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full border p-2 rounded" required/>
        )}
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full border p-2 rounded" required/>
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full border p-2 rounded" required/>
        <button className="w-full py-2 bg-indigo-600 text-white rounded">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <div className="mt-4 text-sm">
        {mode === 'login' ? (
          <>No account? <button onClick={()=>setMode('register')} className="text-indigo-600">Register</button></>
        ) : (
          <>Have account? <button onClick={()=>setMode('login')} className="text-indigo-600">Login</button></>
        )}
      </div>
    </div>
  );
}
