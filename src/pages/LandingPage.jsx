import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  BookMarked, 
  RotateCcw, 
  Calculator, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Library
} from 'lucide-react';
import { motion } from 'framer-motion';

const Features = [
  {
    title: "Book Management",
    description: "Easily catalog, update and track your entire library collection with real-time inventory.",
    icon: BookMarked,
    color: "bg-blue-500"
  },
  {
    title: "Issue & Return System",
    description: "Streamlined process for issuing books to members and managing returns efficiently.",
    icon: RotateCcw,
    color: "bg-purple-500"
  },
  {
    title: "Fine Calculation",
    description: "Automatic calculation of late fees based on custom rules and return timestamps.",
    icon: Calculator,
    color: "bg-pink-500"
  },
  {
    title: "Global Search",
    description: "Advanced filtering and search capabilities to find any book or user in seconds.",
    icon: Search,
    color: "bg-amber-500"
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full gradient-bg -z-10 opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-primary-600 uppercase bg-primary-50 rounded-full">
                The Future of Libraries
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8">
                Smart Library <br />
                <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
                Manage books, users, and transactions seamlessly with a beautiful user experience.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 hover:scale-105 transition-all shadow-xl shadow-primary-200 flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight size={20} />
                </Link>
                <Link
                  to="/books/search"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-2xl font-bold text-lg hover:border-primary-600 hover:text-primary-600 transition-all flex items-center justify-center gap-2"
                >
                  Explore Books
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Everything you need to succeed</h2>
            <p className="mt-4 text-lg text-slate-600">Built for modern educational institutions and libraries.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
              >
                <div className={`w-14 h-14 ${feature.color} text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Redefining Library Management for the Digital Age</h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                LibraSys was born out of a simple idea: making library administration as intuitive as using a smartphone. We believe that technology should empower educators and librarians, not complicate their work.
              </p>
              <ul className="space-y-4">
                {[
                  "Fully cloud-based architecture",
                  "Real-time data synchronization",
                  "Advanced security & role management",
                  "Seamless mobile experience"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      <ShieldCheck size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-indigo-100 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-12">
                <Library size={160} className="text-primary-600 opacity-20 absolute" />
                <BookMarked size={120} className="text-primary-600 relative z-10" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                <p className="text-3xl font-black text-primary-600">99.9%</p>
                <p className="text-slate-500 font-bold text-sm">Uptime Guaranteed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="bg-primary-600 p-1.5 rounded-lg text-white">
                  <Library size={20} />
                </div>
                <span className="text-2xl font-bold text-white">LibraSys</span>
              </Link>
              <p className="text-sm leading-relaxed">
                The most advanced library management platform for schools, universities, and private collections.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                <li><Link to="/login" className="hover:text-primary-400 transition-colors">Login</Link></li>
                <li><Link to="/register" className="hover:text-primary-400 transition-colors">Register</Link></li>
                <li><Link to="/books/search" className="hover:text-primary-400 transition-colors">Browse Books</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm">
                <li className="hover:text-primary-400 cursor-pointer">Help Center</li>
                <li className="hover:text-primary-400 cursor-pointer">Documentation</li>
                <li className="hover:text-primary-400 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-primary-400 cursor-pointer">Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li>Email: support@librasys.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Library Lane, Education City</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 text-center text-sm">
            <p>&copy; 2026 LibraSys. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
