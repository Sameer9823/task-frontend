import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Product Management System</h1>
        <p className="mb-6 text-gray-300 max-w-xl">
          Manage your products efficiently with secure authentication and intuitive controls.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg font-medium transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-lg font-medium transition"
          >
            Register
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
