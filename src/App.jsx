import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import About from './pages/About';
import Archive from './pages/Archive';
import AdminDashboard from './pages/AdminDashboard';
import PostEditor from './pages/PostEditor';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <ScrollToTop />
        <Navigation />
        <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<BlogPost />} />
            <Route path="/blog" element={<Archive />} />
            <Route path="/about" element={<About />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/contact" element={<div className="container" style={{ padding: '5rem' }}>Contact Page Coming Soon</div>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/new" element={<PostEditor />} />
              <Route path="/admin/edit/:id" element={<PostEditor />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
