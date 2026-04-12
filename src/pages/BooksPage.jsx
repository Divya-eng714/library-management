import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  BookMarked,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import api from '../services/api';
import { getStoredBooks, deleteBookFromStore } from '../utils/storage';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [error, setError] = useState(null);

  const categories = ['All', 'Fiction', 'Science', 'Technology', 'History', 'Biography', 'Business'];

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      // Fallback to local storage for demo
      setBooks(getStoredBooks());
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await api.delete(`/books/${id}`);
      } catch (err) {
        // Fallback for demo
        deleteBookFromStore(id);
      }
      setBooks(books.filter(b => b.id !== id));
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || book.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Books Inventory</h1>
          <p className="text-slate-500 mt-1">Manage all your books in one place.</p>
        </div>
        <Link
          to="/books/add"
          className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Add New Book
        </Link>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-10 focus:ring-2 focus:ring-primary-500 transition-all outline-none appearance-none font-medium text-slate-700"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {error && filteredBooks.length === 0 ? (
        <div className="p-8 bg-red-50 border border-red-100 rounded-3xl text-center">
          <AlertCircle className="mx-auto text-red-500 mb-2" size={32} />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Book Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                          <BookMarked size={20} />
                        </div>
                        <p className="font-semibold text-slate-800">{book.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{book.author}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        book.availability === 'Available' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {book.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opactiy-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          to={`/books/edit/${book.id}`}
                          className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(book.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-6 border-t border-slate-50 flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing {filteredBooks.length} of {books.length} books</p>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50">
                <ChevronLeft size={20} />
              </button>
              <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
