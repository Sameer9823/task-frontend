import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Product Management</div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/products" className="hover:text-gray-300">Products</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/register" className="hover:text-gray-300">Register</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col mt-2 space-y-2">
          <Link to="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/login" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/register" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
