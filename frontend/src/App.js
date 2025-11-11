
// import React, { useEffect, useRef, useState } from 'react';
// import Navbar from './components/Header/Navbar';
// import HeroSection from './components/Hero/HeroSection';
// import AboutSection from './pages/About/AboutSection';
// import ProjectsSection from './pages/Projects/ProjectSection';
// import SkillsSection from './pages/Skills/SkillsSection';
// import CertificatesSection from './pages/certificates/CertificatesSection';
// import ContactSection from './components/Contact/ContactSection';
// import FooterComponent from './components/FooterComponent/FooterComponent';
// import AIChatButton from './components/AIchatBOT/AIChatButton';
// import './index.css';

// export default function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');
//   const [loading, setLoading] = useState(true);
//   const sections = useRef([]);

//   const navLinks = [
//     { name: 'Home', href: '#home' },
//     { name: 'About', href: '#about' },
//     { name: 'Projects', href: '#projects' },
//     { name: 'Skills', href: '#skills' },
//     { name: 'Certificates', href: '#certificates' },
//     { name: 'Contact', href: '#contact' },
//   ];

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const sectionElements = document.querySelectorAll('[data-section]');
//     sections.current = Array.from(sectionElements);

//     const handleScroll = () => {
//       const pageY = window.scrollY + window.innerHeight / 3;
//       let newActiveSection = 'home';

//       sections.current.forEach((section) => {
//         if (section.offsetTop <= pageY) {
//           newActiveSection = section.id;
//         }

//         const rect = section.getBoundingClientRect();
//         if (rect.top < window.innerHeight - 100) {
//           section.classList.add('visible');
//         }
//       });

//       setActiveSection(newActiveSection);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-[#0f071a] flex items-center justify-center z-[9999]">
//         <h1 className="text-4xl font-bold text-purple-400 animate-pulse">CodeAnkush</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#0f071a] text-gray-200 font-sans overflow-x-hidden relative">
//       {/* Navbar */}
//       <Navbar
//         navLinks={navLinks}
//         isMenuOpen={isMenuOpen}
//         setIsMenuOpen={setIsMenuOpen}
//         activeSection={activeSection}
//       />

//       {/* Main Content */}
//       <main onClick={() => setIsMenuOpen(false)}>
//         <section id="home" data-section className="section px-4 sm:px-6 lg:px-8">
//           <HeroSection />
//         </section>
//         <section id="about" data-section className="section px-4 sm:px-6 lg:px-8">
//           <AboutSection />
//         </section>
//         <section id="projects" data-section className="section px-4 sm:px-6 lg:px-8">
//           <ProjectsSection />
//         </section>
//         <section id="skills" data-section className="section px-4 sm:px-6 lg:px-8">
//           <SkillsSection />
//         </section>
//         <section id="certificates" data-section className="section px-4 sm:px-6 lg:px-8">
//           <CertificatesSection />
//         </section>
//         <section id="contact" data-section className="section px-4 sm:px-6 lg:px-8">
//           <ContactSection />
//         </section>
//       </main>

//       {/* Footer & Chatbot */}
//       <FooterComponent />
//       <AIChatButton />

//       {/* Scroll-to-Top Button */}
//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-6 left-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg transition-all z-50"
//         aria-label="Scroll to top"
//       >
//         ↑ Top
//       </button>
//     </div>
//   );
// }









// import React, { useEffect, useRef, useState } from 'react';
// import Navbar from './components/Header/Navbar';
// import HeroSection from './components/Hero/HeroSection';
// import AboutSection from './pages/About/AboutSection';
// import ProjectsSection from './pages/Projects/ProjectSection';
// import SkillsSection from './pages/Skills/SkillsSection';
// import CertificatesSection from './pages/certificates/CertificatesSection';
// import ContactSection from './components/Contact/ContactSection';
// import AdminDashboardSection from './pages/Admin/AdminDashboardSection';
// import FooterComponent from './components/FooterComponent/FooterComponent';
// import AIChatButton from './components/AIchatBOT/AIChatButton';
// import './index.css';

// export default function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');
//   const [loading, setLoading] = useState(true);
//   const sections = useRef([]);

//   const user = JSON.parse(localStorage.getItem('user'));
//   const isAdmin = user?.role === 'admin';

//   const navLinks = [
//     { name: 'Home', href: '#home' },
//     { name: 'About', href: '#about' },
//     { name: 'Projects', href: '#projects' },
//     { name: 'Skills', href: '#skills' },
//     { name: 'Certificates', href: '#certificates' },
//     { name: 'Contact', href: '#contact' },
//     ...(isAdmin ? [{ name: 'Admin', href: '#admin' }] : [])
//   ];

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const sectionElements = document.querySelectorAll('[data-section]');
//     sections.current = Array.from(sectionElements);

//     const handleScroll = () => {
//       const pageY = window.scrollY + window.innerHeight / 3;
//       let newActiveSection = 'home';

//       sections.current.forEach((section) => {
//         if (section.offsetTop <= pageY) {
//           newActiveSection = section.id;
//         }

//         const rect = section.getBoundingClientRect();
//         if (rect.top < window.innerHeight - 100) {
//           section.classList.add('visible');
//         }
//       });

//       setActiveSection(newActiveSection);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-[#0f071a] flex items-center justify-center z-[9999]">
//         <h1 className="text-4xl font-bold text-purple-400 animate-pulse">CodeAnkush</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#0f071a] text-gray-200 font-sans overflow-x-hidden relative">
//       <Navbar
//         navLinks={navLinks}
//         isMenuOpen={isMenuOpen}
//         setIsMenuOpen={setIsMenuOpen}
//         activeSection={activeSection}
//       />

//       <main onClick={() => setIsMenuOpen(false)}>
//         <section id="home" data-section className="section px-4 sm:px-6 lg:px-8">
//           <HeroSection />
//         </section>
//         <section id="about" data-section className="section px-4 sm:px-6 lg:px-8">
//           <AboutSection />
//         </section>
//         <section id="projects" data-section className="section px-4 sm:px-6 lg:px-8">
//           <ProjectsSection />
//         </section>
//         <section id="skills" data-section className="section px-4 sm:px-6 lg:px-8">
//           <SkillsSection />
//         </section>
//         <section id="certificates" data-section className="section px-4 sm:px-6 lg:px-8">
//           <CertificatesSection />
//         </section>
//         <section id="contact" data-section className="section px-4 sm:px-6 lg:px-8">
//           <ContactSection />
//         </section>
//         {isAdmin && (
//           <section id="admin" data-section className="section px-4 sm:px-6 lg:px-8">
//             <AdminDashboardSection />
//           </section>
//         )}
//       </main>

//       <FooterComponent />
//       <AIChatButton />

//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-6 left-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg transition-all z-50"
//         aria-label="Scroll to top"
//       >
//         ↑ Top
//       </button>
//     </div>
//   );
// }












// import React, { useState, useEffect } from 'react'; // ✅ remove useRef
// import NavbarLayout from './components/Header/Navbar';
// import Hero from './components/Hero/HeroSection';
// import About from './pages/About/AboutSection';
// import Projects from './pages/Projects/ProjectSection';
// import Skills from './pages/Skills/SkillsSection';
// import Certificates from './pages/certificates/CertificatesSection';
// import Contact from './components/Contact/ContactSection';
// import AdminDashboard from './pages/Admin/AdminDashboardSection';
// import FooterComponent from './components/FooterComponent/FooterComponent';
// import AIChatButton from './components/AIchatBOT/AIChatButton';
// import './index.css';

// export default function App() {
//   const [loading, setLoading] = useState(true);
//   const user = JSON.parse(localStorage.getItem('user'));
//   const isAdmin = user?.role === 'admin';

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-[#0f071a] flex items-center justify-center z-[9999]">
//         <h1 className="text-4xl font-bold text-purple-400 animate-pulse">CodeAnkush</h1>
//       </div>
//     );
//   }

//   return (
//     <NavbarLayout>
//       <section id="home" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Hero />
//       </section>
//       <section id="about" data-section className="section px-4 sm:px-6 lg:px-8">
//         <About />
//       </section>
//       <section id="projects" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Projects />
//       </section>
//       <section id="skills" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Skills />
//       </section>
//       <section id="certificates" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Certificates />
//       </section>
//       <section id="contact" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Contact />
//       </section>
//       {isAdmin && (
//         <section id="admin" data-section className="section px-4 sm:px-6 lg:px-8">
//           <AdminDashboard />
//         </section>
//       )}

//       <FooterComponent />
//       <AIChatButton />

//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-6 left-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg transition-all z-50"
//         aria-label="Scroll to top"
//       >
//         ↑ Top
//       </button>
//     </NavbarLayout>
//   );
// }
















// import React, { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import AdminLogin from './pages/Admin/AdminLogin';
// import NavbarLayout from './components/Header/Navbar';
// import Hero from './components/Hero/HeroSection';
// import About from './pages/About/AboutSection';
// import Projects from './pages/Projects/ProjectSection';
// import Skills from './pages/Skills/SkillsSection';
// import Certificates from './pages/certificates/CertificatesSection';
// import Contact from './components/Contact/ContactSection';
// import AdminDashboard from './pages/Admin/AdminDashboardSection';
// import FooterComponent from './components/FooterComponent/FooterComponent';
// import AIChatButton from './components/AIchatBOT/AIChatButton';
// import './index.css';

// const PortfolioLayout = () => {
//   const [loading, setLoading] = useState(true);
//   const user = JSON.parse(localStorage.getItem('user'));
//   const isAdmin = user?.role === 'admin';

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-[#0f071a] flex items-center justify-center z-[9999]">
//         <h1 className="text-4xl font-bold text-purple-400 animate-pulse">CodeAnkush</h1>
//       </div>
//     );
//   }

//   return (
//     <NavbarLayout>
//       <section id="home" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Hero />
//       </section>
//       <section id="about" data-section className="section px-4 sm:px-6 lg:px-8">
//         <About />
//       </section>
//       <section id="projects" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Projects />
//       </section>
//       <section id="skills" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Skills />
//       </section>
//       <section id="certificates" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Certificates />
//       </section>
//       <section id="contact" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Contact />
//       </section>
//       {isAdmin && (
//         <section id="admin" data-section className="section px-4 sm:px-6 lg:px-8">
//           <AdminDashboard />
//         </section>
//       )}

//       <FooterComponent />
//       <AIChatButton />

//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-6 left-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg transition-all z-50"
//         aria-label="Scroll to top"
//       >
//         ↑ Top
//       </button>
//     </NavbarLayout>
//   );
// };

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<PortfolioLayout />} />
//       <Route path="/admin-login" element={<AdminLogin />} />
//     </Routes>
//   );
// }










// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import AdminLogin from './pages/Admin/AdminLogin';
// import AdminDashboard from './pages/Admin/AdminDashboardSection';
// import NavbarLayout from './components/Header/Navbar';
// import Hero from './components/Hero/HeroSection';
// import About from './pages/About/AboutSection';
// import Projects from './pages/Projects/ProjectSection';
// import Skills from './pages/Skills/SkillsSection';
// import Certificates from './pages/certificates/CertificatesSection';
// import Contact from './components/Contact/ContactSection';
// import FooterComponent from './components/FooterComponent/FooterComponent';
// import AIChatButton from './components/AIchatBOT/AIChatButton';
// import './index.css';

// const PortfolioLayout = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-[#0f071a] flex items-center justify-center z-[9999]">
//         <h1 className="text-4xl font-bold text-purple-400 animate-pulse">CodeAnkush</h1>
//       </div>
//     );
//   }

//   return (
//     <NavbarLayout>
//       <section id="home" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Hero />
//       </section>
//       <section id="about" data-section className="section px-4 sm:px-6 lg:px-8">
//         <About />
//       </section>
//       <section id="projects" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Projects />
//       </section>
//       <section id="skills" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Skills />
//       </section>
//       <section id="certificates" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Certificates />
//       </section>
//       <section id="contact" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Contact />
//       </section>

//       <FooterComponent />
//       <AIChatButton />

//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-6 left-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg transition-all z-50"
//         aria-label="Scroll to top"
//       >
//         ↑ Top
//       </button>
//     </NavbarLayout>
//   );
// };

// // 🔐 Admin route protection
// const ProtectedAdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const isAdmin = user?.role === 'admin';
//   return isAdmin ? children : <Navigate to="/admin-login" replace />;
// };

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<PortfolioLayout />} />
//       <Route path="/admin-login" element={<AdminLogin />} />
//       <Route
//         path="/admin/dashboard"
//         element={
//           <ProtectedAdminRoute>
//             <AdminDashboard />
//           </ProtectedAdminRoute>
//         }
//       />
//     </Routes>
//   );
// }










// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import AdminLogin from './pages/Admin/AdminLogin';
// import AdminDashboard from './pages/Admin/AdminDashboardSection';
// import NavbarLayout from './components/Header/Navbar';
// import Hero from './components/Hero/HeroSection';
// import About from './pages/About/AboutSection';
// import Projects from './pages/Projects/ProjectSection';
// import Skills from './pages/Skills/SkillsSection';
// import Certificates from './pages/certificates/CertificatesSection';
// import Contact from './components/Contact/ContactSection';
// import FooterComponent from './components/FooterComponent/FooterComponent';
// import AIChatButton from './components/AIchatBOT/AIChatButton';
// import './index.css';

// const PortfolioLayout = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div
//         className="fixed inset-0 bg-[#0f071a] flex items-center justify-center z-[9999]"
//         role="status"
//         aria-label="Loading portfolio"
//       >
//         <h1 className="text-4xl font-bold text-purple-400 animate-pulse">CodeAnkush</h1>
//       </div>
//     );
//   }

//   return (
//     <NavbarLayout>
//       <section id="home" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Hero />
//       </section>
//       <section id="about" data-section className="section px-4 sm:px-6 lg:px-8">
//         <About />
//       </section>
//       <section id="projects" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Projects />
//       </section>
//       <section id="skills" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Skills />
//       </section>
//       <section id="certificates" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Certificates />
//       </section>
//       <section id="contact" data-section className="section px-4 sm:px-6 lg:px-8">
//         <Contact />
//       </section>

//       <FooterComponent />
//       <AIChatButton />

//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-6 left-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg transition-all z-50"
//         aria-label="Scroll to top"
//       >
//         ↑ Top
//       </button>
//     </NavbarLayout>
//   );
// };

// // 🔐 Admin route protection
// const ProtectedAdminRoute = ({ children }) => {
//   let isAdmin = false;
//   try {
//     const user = JSON.parse(localStorage.getItem('user'));
//     isAdmin = user?.role === 'admin';
//   } catch (err) {
//     console.warn('⚠️ Invalid user data in localStorage');
//   }

//   return isAdmin ? children : <Navigate to="/admin-login" replace />;
// };

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<PortfolioLayout />} />
//       <Route path="/admin-login" element={<AdminLogin />} />
//       <Route
//         path="/admin/dashboard"
//         element={
//           <ProtectedAdminRoute>
//             <AdminDashboard />
//           </ProtectedAdminRoute>
//         }
//       />
//     </Routes>
//   );
// }











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

// 🔐 Admin route protection
const ProtectedAdminRoute = ({ children }) => {
  let isAdmin = false;
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    isAdmin = user?.role === 'admin' && !!token;
  } catch (err) {
    console.warn('⚠️ Invalid user data in localStorage');
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