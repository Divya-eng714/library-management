import React, { useState, useEffect } from 'react';
import { Users, Mail, Shield, Trash2, Search, Filter, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { getStoredUsers, deleteUserFromStore } from '../utils/storage';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      // Fallback
      setUsers(getStoredUsers());
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await api.delete(`/users/${id}`);
      } catch (err) {
        deleteUserFromStore(id);
      }
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500 mt-1">Manage library members and administrator accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Users size={16} className="text-primary-500" />
            Total Members: {users.length}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
          />
        </div>
      </div>

      {error && !users.length ? (
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
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border-2 border-white group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                          {user.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{user.name}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail size={12} /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        user.role === 'ADMIN' 
                          ? 'bg-purple-100 text-purple-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        <Shield size={12} />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.role !== 'ADMIN' && (
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
