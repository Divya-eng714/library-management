import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { getStoredBooks, getStoredUsers, getStoredIssues } from '../utils/storage';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color} text-white shadow-lg`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <TrendingUp size={12} /> {trend}
        </span>
      )}
    </div>
    <p className="text-slate-500 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
  </motion.div>
);

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    issuedBooks: 0,
    returnedBooks: 0,
    activeUsers: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await api.get('/dashboard/stats');
        setStats(statsRes.data);
        const activityRes = await api.get('/dashboard/recent-activity');
        setRecentActivity(activityRes.data);
      } catch (err) {
        // Fallback for demo
        const books = getStoredBooks();
        const users = getStoredUsers();
        const issues = getStoredIssues();
        
        setStats({
          totalBooks: books.length,
          issuedBooks: issues.length,
          returnedBooks: 0,
          activeUsers: users.length
        });
        setRecentActivity(issues.slice(0, 5).map(i => ({
          id: i.id,
          type: 'issue',
          book: i.bookTitle,
          user: i.userName,
          date: 'Recently',
          status: 'Issued'
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quick Overview</h1>
          <p className="text-slate-500 mt-1">Check your library statistics at a glance.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-2">
            <Clock size={16} /> Last updated: Just now
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Books" 
          value={stats.totalBooks} 
          icon={BookOpen} 
          color="bg-blue-600" 
          trend="+12%"
        />
        <StatCard 
          title="Issued Books" 
          value={stats.issuedBooks} 
          icon={ArrowUpRight} 
          color="bg-amber-500" 
          trend="+5%"
        />
        <StatCard 
          title="Returned Books" 
          value={stats.returnedBooks} 
          icon={ArrowDownLeft} 
          color="bg-emerald-500" 
          trend="+18%"
        />
        <StatCard 
          title="Active Users" 
          value={stats.activeUsers} 
          icon={Users} 
          color="bg-indigo-600" 
        />
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
          <button className="text-sm font-bold text-primary-600 hover:text-primary-700">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Book</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800 group-hover:text-primary-600 transition-colors uppercase text-sm">{activity.book}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {activity.user}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {activity.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      activity.type === 'issue' 
                        ? 'bg-amber-100 text-amber-600' 
                        : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {activity.type === 'issue' ? <ArrowUpRight size={12} /> : <CheckCircle2 size={12} />}
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
