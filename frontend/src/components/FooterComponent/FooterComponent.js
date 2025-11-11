

import React from 'react';
import { Mail, Phone, MapPin, GitHub, Linkedin } from 'react-feather';

const FooterComponent = () => {
  return (
    <footer className="bg-[#1a112b] text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <a
                href="mailto:ankushchoudhary2019@gmail.com"
                className="hover:text-purple-400 transition"
              >
                ankushchoudhary2019@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <a
                href="tel:+917999182859"
                className="hover:text-purple-400 transition"
              >
                +91 79991 82859
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Burhanpur, India</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Follow Me</h4>
          <div className="flex gap-4">
            <a
              href="https://github.com/mrankush079"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-purple-400 transition"
            >
              <GitHub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/mrankush079"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-purple-400 transition"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/mr_ankush_079/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-purple-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 2.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM12 7.25a4.75 4.75 0 1 1 0 9.5a4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-12">
        © {new Date().getFullYear()} CodeAnkush. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;