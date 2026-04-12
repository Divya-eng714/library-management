import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Users, 
  LogOut,
  Library
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'Admin';

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { title: 'Books', path: '/books', icon: BookOpen },
    { title: 'Issue Book', path: '/issue', icon: ArrowUpRight },
    { title: 'Return Book', path: '/return', icon: ArrowDownLeft },
  ];

  if (isAdmin) {
    menuItems.push({ title: 'Users', path: '/users', icon: Users });
  }

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary-600 p-2 rounded-lg text-white">
          <Library size={24} />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          LibraSys
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-primary-50 text-primary-600 font-semibold shadow-sm mb-1' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600 mb-1'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-primary-600' : 'text-slate-400'} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
