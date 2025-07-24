import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function ProductFormPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/products', { name, price, description });
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex justify-center items-center flex-1 p-4 sm:p-6">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
              Add Product
            </h2>

            <div>
              <label className="block mb-1 text-sm">Name</label>
              <input
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Price ($)</label>
              <input
                type="number"
                placeholder="Product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Description</label>
              <textarea
                placeholder="Product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                rows={3}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 p-2 sm:p-3 rounded text-base sm:text-lg font-semibold transition"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductFormPage;
