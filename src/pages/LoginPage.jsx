import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { setAuth } from '../features/authSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      dispatch(setAuth({ token: res.data.token, user: res.data.user }));
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white mx-2">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>

        <div>
          <label className="block mb-1 text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-lg font-semibold transition"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default LoginPage;
