
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboardSection';
import NavbarLayout from './components/Header/Navbar';
import Hero from './components/Hero/HeroSection';
import About from './pages/About/AboutSection';
import Projects from './pages/Projects/ProjectSection';
import Skills from './pages/Skills/SkillsSection';
import Certificates from './pages/certificates/CertificatesSection';
import Contact from './components/Contact/ContactSection';
import FooterComponent from './components/FooterComponent/FooterComponent';
import AIChatButton from './components/AIchatBOT/AIChatButton';
import './index.css';

const PortfolioLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className="fixed inset-0 bg-[#0f071a] flex items-center justify-center z-[9999]"
        role="status"
        aria-label="Loading portfolio"
      >
        <h1 className="text-4xl font-bold text-purple-400 animate-pulse">CodeAnkush</h1>
      </div>
    );
  }

  return (
    <NavbarLayout>
      <section id="home" data-section className="section px-4 sm:px-6 lg:px-8">
        <Hero />
      </section>
      <section id="about" data-section className="section px-4 sm:px-6 lg:px-8">
        <About />
      </section>
      <section id="projects" data-section className="section px-4 sm:px-6 lg:px-8">
        <Projects />
      </section>
      <section id="skills" data-section className="section px-4 sm:px-6 lg:px-8">
        <Skills />
      </section>
      <section id="certificates" data-section className="section px-4 sm:px-6 lg:px-8">
        <Certificates />
      </section>
      <section id="contact" data-section className="section px-4 sm:px-6 lg:px-8">
        <Contact />
      </section>

      <FooterComponent />
      <AIChatButton />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg transition-all z-50"
        aria-label="Scroll to top"
      >
        ↑ Top
      </button>
    </NavbarLayout>
  );
};

//  Admin route protection
const ProtectedAdminRoute = ({ children }) => {
  let isAdmin = false;
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    isAdmin = user?.role === 'admin' && !!token;
  } catch (err) {
    console.warn(' Invalid user data in localStorage');
  }

  return isAdmin ? children : <Navigate to="/admin-login" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioLayout />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      {/* Optional: Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}