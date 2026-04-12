import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, User, Search, Library } from 'lucide-react';

const Navbar = ({ type = 'landing' }) => {
  const { user, logout } = useAuth();

  if (type === 'dashboard') {
    return (
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-slate-800 capitalize">
            {location.pathname.replace('/', '') || 'Dashboard'}
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-slate-100 border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
            />
          </div>
          
          <button className="relative text-slate-500 hover:text-primary-600">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-slate-800">{user?.name || 'Guest'}</p>
              <p className="text-xs text-slate-500">{user?.role || 'Member'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold border-2 border-primary-50">
              {user?.name?.[0]?.toUpperCase() || <User size={20} />}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex items-center justify-between border-b border-white/20">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-primary-600 p-1.5 rounded-lg text-white">
          <Library size={20} />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          LibraSys
        </span>
      </Link>

      <div className="flex items-center gap-8 text-slate-600 font-medium">
        <a href="#home" className="hover:text-primary-600 transition-colors">Home</a>
        <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
        <a href="#about" className="hover:text-primary-600 transition-colors">About</a>
        <Link to="/books/search" className="hover:text-primary-600 transition-colors">Search Books</Link>
        {user ? (
          <div className="flex items-center gap-4">
            <Link 
              to="/dashboard" 
              className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
            >
              Dashboard
            </Link>
            <button 
              onClick={logout}
              className="text-slate-600 hover:text-red-600 font-bold transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-primary-600 transition-colors">Login</Link>
            <Link 
              to="/register" 
              className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
