import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsOpen(false);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Top Navbar for mobile */}
      <div className="bg-gray-800 text-gray-200 flex justify-between items-center px-4 py-3 sm:hidden">
       <h1 className="text-xl">Product Management</h1>
        <button onClick={toggleSidebar}>
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-gray-200 w-48 p-4 min-h-screen fixed top-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out z-50 sm:translate-x-0 sm:static`}
      >
        <ul>
          <li className="mb-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-white">Home</Link>
          </li>
          <li className="mb-4">
            <Link to="/products" onClick={() => setIsOpen(false)} className="hover:text-white">Products</Link>
          </li>
          <li className="mb-4">
            <Link to="/add" onClick={() => setIsOpen(false)} className="hover:text-white">Add Product</Link>
          </li>
          {!token ? (
            <li className="mb-4">
              <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-white">Login</Link>
            </li>
          ) : (
            <li className="mb-4">
              <button onClick={handleLogout} className="hover:text-white w-full text-left">Logout</button>
            </li>
          )}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
