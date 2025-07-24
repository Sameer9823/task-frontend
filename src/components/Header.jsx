import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white p-4  justify-between hidden md:flex ">
      <h1 className="text-xl">Product Management</h1>
      <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
    </header>
  );
}

export default Header;
