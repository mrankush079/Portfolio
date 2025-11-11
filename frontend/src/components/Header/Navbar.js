
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
