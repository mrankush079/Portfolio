
import React from 'react';
import { Menu, X } from 'react-feather';
import { toast } from 'react-toastify';

const Header = ({ navLinks, isMenuOpen, setIsMenuOpen, activeSection }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out');
    window.location.href = '/';
  };

  const filteredLinks = [
    ...navLinks,
    ...(isAdmin ? [{ name: 'Admin', href: '#admin' }] : [])
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f071a]/80 backdrop-blur-md shadow-md transition-all animate-fadeIn">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          className="text-4xl font-extrabold text-white hover:text-purple-400 transition duration-300 tracking-wide"
        >
          <span className="text-purple-400 drop-shadow-[0_0_6px_#a855f7] animate-pulse">Code</span>ANKUSH
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 items-center">
          {filteredLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative text-xl font-semibold transition-all duration-300 ${
                activeSection === link.href.substring(1)
                  ? 'text-purple-400 drop-shadow-[0_0_6px_#a855f7]'
                  : 'text-gray-300 hover:text-purple-400 hover:drop-shadow-[0_0_6px_#a855f7]'
              } group`}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
          ))}

          {/* Auth Controls */}
          {!user ? (
            <a
              href="/admin-login"
              className="text-sm font-semibold text-gray-300 hover:text-purple-400 transition ml-6"
            >
              Admin Login
            </a>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-red-400 hover:text-white transition ml-6"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle menu"
            className="text-white hover:text-purple-400 transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-[#1a112b] shadow-lg border-t border-purple-800/50 animate-slideDown"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col items-center p-6 space-y-6">
            {filteredLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-semibold transition-all duration-300 ${
                  activeSection === link.href.substring(1)
                    ? 'text-purple-400 drop-shadow-[0_0_6px_#a855f7]'
                    : 'text-gray-300 hover:text-purple-400 hover:drop-shadow-[0_0_6px_#a855f7]'
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Auth Controls */}
            {!user ? (
              <a
                href="/admin-login"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-semibold text-gray-300 hover:text-purple-400"
              >
                Admin Login
              </a>
            ) : (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="text-lg font-semibold text-red-400 hover:text-white"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;