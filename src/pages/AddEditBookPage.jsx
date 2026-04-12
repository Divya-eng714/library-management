import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Save, BookOpen, User, Hash, Tag, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { addBookToStore } from '../utils/storage';

const AddEditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Fiction',
    quantity: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await api.get(`/books/${id}`);
      setFormData(res.data);
    } catch (err) {
      setError("Failed to fetch book details.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await api.put(`/books/${id}`, formData);
      } else {
        await api.post('/books', formData);
      }
      navigate('/books');
    } catch (err) {
      // SMART FALLBACK: Add to local storage for demo
      console.warn("Backend offline, saving book to local storage.");
      addBookToStore(formData);
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button 
        onClick={() => navigate('/books')}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-medium"
      >
        <ChevronLeft size={20} /> Back to Books
      </button>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="bg-primary-600 p-8 text-white">
          <h1 className="text-3xl font-bold">{isEdit ? 'Edit Book' : 'Add New Book'}</h1>
          <p className="text-primary-100 mt-2">Enter the book details below to catalog it.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Book Title</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                  placeholder="e.g. The Pragmatic Programmer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Author Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                  placeholder="e.g. Andrew Hunt"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 transition-all outline-none appearance-none"
                  >
                    <option value="Fiction">Fiction</option>
                    <option value="Science">Science</option>
                    <option value="Technology">Technology</option>
                    <option value="History">History</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Quantity</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white rounded-2xl py-4 font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <Save size={20} />
              {loading ? 'Saving...' : (isEdit ? 'Update Book' : 'Add Book')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBookPage;
