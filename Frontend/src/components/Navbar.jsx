import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-3 bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text animate-pulse tracking-tight"
        >
          CloudPin
        </Link>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-slate-800 text-2xl"
          onClick={handleToggle}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-5 text-sm font-medium">
          {isLoggedIn ? (
            <>
              <Link
                to="/upload"
                className="relative text-slate-800 hover:text-blue-600 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Upload
              </Link>
              <Link
                to="/my-files"
                className="relative text-slate-800 hover:text-blue-600 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                My Files
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded-full border border-red-500/30 hover:bg-red-500/20 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-red-500/40"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-800 hover:text-blue-600 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-pink-500/50 hover:scale-105 transition-transform duration-300 border border-white/20"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 text-sm font-medium">
          {isLoggedIn ? (
            <>
              <Link
                to="/upload"
                onClick={closeMenu}
                className="block text-slate-800 hover:text-blue-600 transition"
              >
                Upload
              </Link>
              <Link
                to="/my-files"
                onClick={closeMenu}
                className="block text-slate-800 hover:text-blue-600 transition"
              >
                My Files
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-red-500/10 text-red-500 px-4 py-2 rounded border border-red-500/30 hover:bg-red-500/20 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block text-slate-800 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="block bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 text-white px-5 py-2 rounded shadow hover:shadow-pink-400/50 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
  