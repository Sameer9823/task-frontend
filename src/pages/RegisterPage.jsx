import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { username, password });
      navigate('/login');
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message || 'Registration failed');
    }
  };

  return (

    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white mx-2">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Register</h2>

        <div>
          <label className="block mb-1 text-sm">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded text-lg font-semibold transition"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
    <Footer />
    </>
  );
}

export default RegisterPage;
