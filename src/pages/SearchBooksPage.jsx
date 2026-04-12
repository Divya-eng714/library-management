import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Search, Filter, BookMarked, User, Tag, ArrowRight, Loader } from 'lucide-react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const BookCard = ({ book }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -8 }}
    className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
  >
    <div className="h-48 bg-slate-100 flex items-center justify-center relative transition-colors group-hover:bg-primary-50">
      <BookMarked size={64} className="text-slate-300 group-hover:text-primary-200 transition-colors" />
      <div className="absolute top-4 right-4 capitalize">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
          book.availability === 'Available' 
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
            : 'bg-red-50 text-red-600 border-red-100'
        }`}>
          {book.availability}
        </span>
      </div>
    </div>
    <div className="p-6">
      <p className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-1">{book.category}</p>
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">{book.title}</h3>
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
        <User size={14} />
        <span>{book.author}</span>
      </div>
      <button className="w-full py-3 bg-slate-50 text-slate-700 font-bold rounded-2xl hover:bg-primary-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
        View Details <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  </motion.div>
);

const SearchBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Fiction', 'Science', 'Technology', 'History', 'Biography'];

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      // Mock data
      setBooks([
        { id: 1, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Technology', availability: 'Available' },
        { id: 2, title: 'Clean Architecture', author: 'Robert C. Martin', category: 'Technology', availability: 'Available' },
        { id: 3, title: 'Sapiens: A Brief History', author: 'Yuval Noah Harari', category: 'History', availability: 'Issued' },
        { id: 4, title: 'Deep Work', author: 'Cal Newport', category: 'Biography', availability: 'Available' },
        { id: 5, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', availability: 'Available' },
        { id: 6, title: 'Astrophysics for People in a Hurry', author: 'Neil deGrasse Tyson', category: 'Science', availability: 'Available' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Discover Your Next Read</h1>
          <p className="text-slate-500 text-lg">Browse through our extensive collection of classic and modern literature.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-4 mb-12 sticky top-24 z-20 border border-white">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, author, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-4 focus:ring-2 focus:ring-primary-500 transition-all outline-none text-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
            <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-slate-400">Loading our collection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-slate-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No books found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchBooksPage;
