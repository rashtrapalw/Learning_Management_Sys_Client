import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('admin_token', res.data.token);
      nav('/admin/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <h4>Admin Login</h4>
        <form onSubmit={submit}>
          <div className="mb-3">
            <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
          </div>
          <div className="mb-3">
            <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
          </div>
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
