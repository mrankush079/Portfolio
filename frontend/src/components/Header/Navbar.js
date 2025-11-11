
// import React, { useEffect, useRef, useState } from 'react';
// import Header from './Header';
// import Hero from '../Hero/HeroSection';
// import About from '../../pages/About/AboutSection';
// import Skills from '../../pages/Skills/SkillsSection';
// import Projects from '../../pages/Projects/ProjectSection';
// import Certificates from '../../pages/certificates/CertificatesSection';
// import Contact from '../Contact/ContactSection';
// import Footer from '../FooterComponent/FooterComponent';
// import AIChatButton from '../AIchatBOT/AIChatButton';

// const NavbarLayout = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');
//   const sections = useRef([]);

//   const navLinks = [
//     { name: 'Home', href: '#home' },
//     { name: 'About', href: '#about' },
//     { name: 'Skills', href: '#skills' },
//     { name: 'Projects', href: '#projects' },
//     { name: 'Certificates', href: '#certificates' },
//     { name: 'Contact', href: '#contact' },
//   ];

//   // Scrollspy + reveal animation
//   useEffect(() => {
//     const sectionElements = document.querySelectorAll('[data-section]');
//     sections.current = Array.from(sectionElements);

//     const handleScroll = () => {
//       const pageY = window.scrollY + window.innerHeight / 3;
//       let newActive = 'home';

//       sections.current.forEach((section) => {
//         if (section.offsetTop <= pageY) {
//           newActive = section.id;
//         }

//         const rect = section.getBoundingClientRect();
//         if (rect.top < window.innerHeight - 100) {
//           section.classList.add('visible');
//         }
//       });

//       setActiveSection(newActive);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="bg-[#0f071a] text-gray-200 min-h-screen font-sans overflow-x-hidden">
//       {/* --- Header with Scrollspy --- */}
//       <Header
//         navLinks={navLinks}
//         isMenuOpen={isMenuOpen}
//         setIsMenuOpen={setIsMenuOpen}
//         activeSection={activeSection}
//       />

//       {/* --- Main Content --- */}
//       <main onClick={() => setIsMenuOpen(false)}>
//         <section id="home" data-section className="section px-4 sm:px-6 lg:px-8">
//           <Hero />
//         </section>
//         <section id="about" data-section className="section px-4 sm:px-6 lg:px-8">
//           <About />
//         </section>
//         <section id="skills" data-section className="section px-4 sm:px-6 lg:px-8">
//           <Skills />
//         </section>
//         <section id="projects" data-section className="section px-4 sm:px-6 lg:px-8">
//           <Projects />
//         </section>
//         <section id="certificates" data-section className="section px-4 sm:px-6 lg:px-8">
//           <Certificates />
//         </section>
//         <section id="contact" data-section className="section px-4 sm:px-6 lg:px-8">
//           <Contact />
//         </section>
//       </main>

//       {/* --- Footer & Floating Chat --- */}
//       <Footer />
//       <AIChatButton />

//       {/* Scroll-to-Top Button */}
//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-6 left-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg transition-all"
//         aria-label="Scroll to top"
//       >
//         ↑ Top
//       </button>
//     </div>
//   );
// };

// export default NavbarLayout;













// import React from 'react';
// import { Menu, X } from 'react-feather';

// const Navbar = ({ isMenuOpen, setIsMenuOpen, activeSection }) => {
//   const navLinks = [
//     { name: 'Home', href: '#home' },
//     { name: 'About', href: '#about' },
//     { name: 'Projects', href: '#projects' },
//     { name: 'Skills', href: '#skills' },
//     { name: 'Certificates', href: '#certificates' },
//     { name: 'Contact', href: '#contact' },
//   ];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#0f071a]/80 shadow-lg border-b border-purple-800/30">
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
//         {/* Logo */}
//         <a href="#home" className="text-purple-400 font-extrabold text-2xl tracking-wide">
//           CodeANKUSH
//         </a>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-8">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               className={`relative text-base font-semibold transition-colors duration-300 ${
//                 activeSection === link.href.slice(1)
//                   ? 'text-purple-400'
//                   : 'text-gray-300 hover:text-purple-400'
//               } group`}
//             >
//               {link.name}
//               <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//             </a>
//           ))}
//         </nav>

//         {/* Mobile Menu Toggle */}
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="md:hidden text-gray-300 hover:text-purple-400"
//           aria-label="Toggle menu"
//         >
//           {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Nav */}
//       {isMenuOpen && (
//         <nav className="md:hidden bg-[#0f071a]/90 border-t border-purple-800/30 px-4 py-4 space-y-4">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               onClick={() => setIsMenuOpen(false)}
//               className={`block text-base font-semibold ${
//                 activeSection === link.href.slice(1)
//                   ? 'text-purple-400'
//                   : 'text-gray-300 hover:text-purple-400'
//               }`}
//             >
//               {link.name}
//             </a>
//           ))}
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Navbar;





// import React from 'react';
// import { Menu, X } from 'react-feather';

// const Navbar = ({ navLinks, isMenuOpen, setIsMenuOpen, activeSection }) => {
//   return (
//     <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#0f071a]/80 shadow-lg border-b border-purple-800/30">
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
//         {/* Logo */}
//         <a href="#home" className="text-purple-400 font-extrabold text-2xl tracking-wide">
//           CodeANKUSH
//         </a>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-8">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               className={`relative text-base font-semibold transition-colors duration-300 ${
//                 activeSection === link.href.slice(1)
//                   ? 'text-purple-400'
//                   : 'text-gray-300 hover:text-purple-400'
//               } group`}
//             >
//               {link.name}
//               <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//             </a>
//           ))}
//         </nav>

//         {/* Mobile Menu Toggle */}
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="md:hidden text-gray-300 hover:text-purple-400"
//           aria-label="Toggle menu"
//         >
//           {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Nav */}
//       {isMenuOpen && (
//         <nav className="md:hidden bg-[#0f071a]/90 border-t border-purple-800/30 px-4 py-4 space-y-4">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               onClick={() => setIsMenuOpen(false)}
//               className={`block text-base font-semibold ${
//                 activeSection === link.href.slice(1)
//                   ? 'text-purple-400'
//                   : 'text-gray-300 hover:text-purple-400'
//               }`}
//             >
//               {link.name}
//             </a>
//           ))}
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Navbar;















// import React, { useEffect, useRef, useState } from 'react';
// import Header from './Header';
// import Hero from '../Hero/HeroSection';
// import About from '../../pages/About/AboutSection';
// import Skills from '../../pages/Skills/SkillsSection';
// import Projects from '../../pages/Projects/ProjectSection';
// import Certificates from '../../pages/certificates/CertificatesSection';
// import Contact from '../Contact/ContactSection';
// import Footer from '../FooterComponent/FooterComponent';
// import AIChatButton from '../AIchatBOT/AIChatButton';

// const NavbarLayout = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');
//   const sections = useRef([]);

//   const navLinks = [
//     { name: 'Home', href: '#home' },
//     { name: 'About', href: '#about' },
//     { name: 'Skills', href: '#skills' },
//     { name: 'Projects', href: '#projects' },
//     { name: 'Certificates', href: '#certificates' },
//     { name: 'Contact', href: '#contact' },
//   ];

//   useEffect(() => {
//     const sectionElements = document.querySelectorAll('[data-section]');
//     sections.current = Array.from(sectionElements);

//     const handleScroll = () => {
//       const pageY = window.scrollY + window.innerHeight / 3;
//       let newActive = 'home';

//       sections.current.forEach((section) => {
//         if (section.offsetTop <= pageY) {
//           newActive = section.id;
//         }

//         const rect = section.getBoundingClientRect();
//         if (rect.top < window.innerHeight - 100) {
//           section.classList.add('visible');
//         }
//       });

//       setActiveSection(newActive);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="bg-[#0f071a] text-gray-200 min-h-screen font-sans overflow-x-hidden relative">
//       <Header
//         navLinks={navLinks}
//         isMenuOpen={isMenuOpen}
//         setIsMenuOpen={setIsMenuOpen}
//         activeSection={activeSection}
//       />

//       <main onClick={() => setIsMenuOpen(false)}>
//         <section id="home" data-section className="section px-4 sm:px-6 lg:px-8">
//           <Hero />
//         </section>
//         <section id="about" data-section className="section px-4 sm:px-6 lg:px-8">
//           <About />
//         </section>
//         <section id="skills" data-section className="section px-4 sm:px-6 lg:px-8">
//           <Skills />
//         </section>
//         <section id="projects" data-section className="section px-4 sm:px-6 lg:px-8">
//           <Projects />
//         </section>
//         <section id="certificates" data-section className="section px-4 sm:px-6 lg:px-8">
//           <Certificates />
//         </section>
//         <section id="contact" data-section className="section px-4 sm:px-6 lg:px-8">
//           <Contact />
//         </section>
//       </main>

//       <Footer />
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
// };

// export default NavbarLayout;









import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';

const NavbarLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const sections = useRef([]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const sectionElements = document.querySelectorAll('[data-section]');
    sections.current = Array.from(sectionElements);

    const handleScroll = () => {
      const pageY = window.scrollY + window.innerHeight / 3;
      let newActive = 'home';

      sections.current.forEach((section) => {
        if (section.offsetTop <= pageY) {
          newActive = section.id;
        }

        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          section.classList.add('visible');
        }
      });

      setActiveSection(newActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0f071a] text-gray-200 min-h-screen font-sans overflow-x-hidden relative">
      <Header
        navLinks={navLinks}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
      />
      <main onClick={() => setIsMenuOpen(false)}>{children}</main>
    </div>
  );
};

export default NavbarLayout;
