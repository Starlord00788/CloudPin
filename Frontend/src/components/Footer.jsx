import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 px-4 py-10 border-t border-gray-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-8">

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <a href="https://www.instagram.com/_palash._007/" className="hover:text-blue-600 transition">About us</a>
          <a href="https://www.instagram.com/_palash._007/" className="hover:text-blue-600 transition">Contact</a>
          <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">LinkedIn</a>
          <a href="https://github.com/Starlord00788" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">GitHub</a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-6">
          {/* Twitter/X */}
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775 
              1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 
              1.184-.897-.959-2.178-1.559-3.594-1.559-2.717 
              0-4.924 2.208-4.924 4.93 0 .39.045.765.127 
              1.124C7.691 8.094 4.066 6.13 1.64 
              3.161c-.427.722-.666 1.561-.666 
              2.475 0 1.71.87 3.213 2.188 
              4.096-.807-.026-1.566-.248-2.229-.616v.061c0 
              2.385 1.693 4.374 3.946 
              4.827-.413.111-.849.171-1.296.171-.314 
              0-.615-.03-.916-.086.631 1.953 2.445 
              3.377 4.604 3.419-1.68 1.319-3.809 
              2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 
              2.189 1.394 4.768 2.21 7.557 2.21 
              9.054 0 14-7.496 14-13.986 
              0-.209 0-.42-.015-.63.962-.689 
              1.8-1.56 2.46-2.548l-.047-.02z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 
              0-3.897.266-4.356 2.62-4.385 
              8.816.029 6.185.484 8.549 4.385 
              8.816 3.6.245 11.626.246 15.23 
              0 3.897-.266 4.356-2.62 
              4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 
              12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.6 0 
              0 .6 0 1.337v21.326C0 23.4.6 24 
              1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 
              1.894-4.788 4.659-4.788 1.325 0 
              2.466.099 2.797.143v3.24l-1.918.001c-1.504 
              0-1.796.715-1.796 1.763v2.313h3.587l-.467 
              3.622h-3.12V24h6.116c.73 0 1.324-.6 
              1.324-1.337V1.337C24 
              .6 23.405 0 22.675 0z"/>
            </svg>
          </a>
        </div>

        {/* Divider */}
        <hr className="w-full border-gray-300" />

        {/* Copyright */}
        <p className="text-sm text-center text-gray-500">
          © {new Date().getFullYear()} OmniDrake Industries Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
