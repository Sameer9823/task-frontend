import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { PencilSquareIcon, TrashIcon, CheckIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '', description: '' });
  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`, { headers: { Authorization: token } });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setEditData({ name: p.name, price: p.price, description: p.description });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ name: '', price: '', description: '' });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`/products/${id}`, editData, { headers: { Authorization: token } });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    navigate('/add');
  };

  return (
    <div className="flex flex-col sm:flex-row bg-gray-900 min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-x-auto">
        <Header />
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Product List</h2>
            {token && (
              <button
                onClick={handleAddProduct}
                className="flex items-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Add Product
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map(p => (
                <div
                  key={p._id}
                  className="bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform"
                >
                  {editingId === p._id ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        className="bg-gray-700 p-2 rounded mb-2 w-full focus:outline-none"
                        placeholder="Product Name"
                      />
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleChange}
                        className="bg-gray-700 p-2 rounded mb-2 w-full focus:outline-none"
                        placeholder="Description"
                      />
                      <input
                        type="number"
                        name="price"
                        value={editData.price}
                        onChange={handleChange}
                        className="bg-gray-700 p-2 rounded mb-4 w-full focus:outline-none"
                        placeholder="Price"
                      />
                      <div className="flex justify-between">
                        <button
                          onClick={() => handleUpdate(p._id)}
                          className="flex items-center bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                        >
                          <CheckIcon className="h-4 w-4 mr-1" />
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
                        >
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">{p.name}</h3>
                        <p className="text-gray-400 mb-4">{p.description}</p>
                        <p className="text-green-400 text-lg font-semibold mb-4">${p.price}</p>
                      </div>
                      {token && (
                        <div className="flex justify-between">
                          <button
                            onClick={() => startEdit(p)}
                            className="flex items-center bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                          >
                            <PencilSquareIcon className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="flex items-center bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                          >
                            <TrashIcon className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400">No products available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
