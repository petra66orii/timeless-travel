import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Active link styling: Underline and slightly bolder
  const isActive = (path: string) =>
    location.pathname === path
      ? "font-semibold underline decoration-2 underline-offset-4"
      : "";

  return (
    <header className="shadow-md">
      {/* --- MAIN NAVIGATION BAR --- */}
      <nav className="bg-pastel-blue text-pastel-dark px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* 1. LOGO */}
          <Link
            to="/"
            className="font-heading text-2xl md:text-3xl font-bold tracking-wide hover:opacity-80 transition"
          >
            Time[less] Travel
          </Link>

          {/* 2. DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8 font-body text-lg">
            <Link
              to="/"
              className={`hover:text-action-info transition ${isActive("/")}`}
            >
              Home
            </Link>

            {isAuthenticated && (
              <Link
                to="/checklists"
                className={`hover:text-action-info transition ${isActive("/checklists")}`}
              >
                Travel Planner
              </Link>
            )}

            <Link
              to="/blog"
              className={`hover:text-action-info transition ${isActive("/blog")}`}
            >
              Blog
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className={`hover:text-action-info transition ${isActive("/profile")}`}
                >
                  My Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-action-delete font-medium hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`hover:text-action-info transition ${isActive("/login")}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`hover:text-action-info transition ${isActive("/register")}`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* 3. MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-pastel-dark/20 flex flex-col space-y-4 pt-4 font-body">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            {isAuthenticated && (
              <Link to="/checklists" onClick={() => setIsMenuOpen(false)}>
                Travel Planner
              </Link>
            )}
            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  My Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-left text-action-delete"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      <div className="bg-slate-50 border-b border-gray-200 py-2 px-4 text-center font-body text-sm text-gray-600 shadow-inner">
        {isAuthenticated && user ? (
          <span>
            Welcome, <strong>{user.user.first_name}</strong>! Happy travelling!
            ✈️
          </span>
        ) : (
          <span>
            Welcome, traveller! Please{" "}
            <Link
              to="/login"
              className="text-action-info font-medium hover:underline"
            >
              log in
            </Link>{" "}
            to start your journey.
          </span>
        )}
      </div>
    </header>
  );
};

export default Navbar;
