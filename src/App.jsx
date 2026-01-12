import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import About from './pages/About';
import Archive from './pages/Archive';
import Spaces from './pages/Spaces';
import { Suspense, lazy } from 'react';

// Lazy Load Admin Routes
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const PostEditor = lazy(() => import('./pages/PostEditor'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));

import { AuthProvider } from './context/AuthContext';
import { IdentityProvider } from './context/IdentityContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import ReadingModeToggle from './components/Reader/ReadingModeToggle';
import OfflineBanner from './components/PWA/OfflineBanner';
import HeatmapTracker from './components/Analytics/HeatmapTracker';

function App() {
  return (
    <AuthProvider>
      <IdentityProvider>
        <div className="app-container">
          <ScrollToTop />
          <div className="grain-overlay"></div>
          <OfflineBanner />
          <HeatmapTracker />
          <Navigation />
          <ReadingModeToggle />
          <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <div key={useLocation().pathname} className="page-transition">
              <style>{`
                @keyframes fadeScale {
                  from { opacity: 0; transform: scale(0.98); }
                  to { opacity: 1; transform: scale(1); }
                }
                .page-transition {
                  animation: fadeScale 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
              `}</style>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:slug" element={<BlogPost />} />
                <Route path="/blog" element={<Archive />} />
                <Route path="/spaces" element={<Spaces />} />
                <Route path="/about" element={<About />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/contact" element={<div className="container" style={{ padding: '5rem' }}>Contact Page Coming Soon</div>} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={
                  <Suspense fallback={<div className="loader"></div>}><Login /></Suspense>
                } />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Suspense fallback={<div className="loader"></div>}><AdminDashboard /></Suspense>} />
                  <Route path="/admin/new" element={<Suspense fallback={<div className="loader"></div>}><PostEditor /></Suspense>} />
                  <Route path="/admin/edit/:id" element={<Suspense fallback={<div className="loader"></div>}><PostEditor /></Suspense>} />
                  <Route path="/profile" element={<Suspense fallback={<div className="loader"></div>}><Profile /></Suspense>} />
                </Route>
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </IdentityProvider>
    </AuthProvider>
  );
}

export default App;
