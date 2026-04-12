import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BooksPage from './pages/BooksPage';
import AddEditBookPage from './pages/AddEditBookPage';
import IssueBookPage from './pages/IssueBookPage';
import ReturnBookPage from './pages/ReturnBookPage';
import UsersPage from './pages/UsersPage';
import SearchBooksPage from './pages/SearchBooksPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/books/search" element={<SearchBooksPage />} />

          {/* Protected Dashboard Routes */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/add" element={<AddEditBookPage />} />
            <Route path="/books/edit/:id" element={<AddEditBookPage />} />
            <Route path="/issue" element={<IssueBookPage />} />
            <Route path="/return" element={<ReturnBookPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
