import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-pastel-blue text-pastel-dark mt-auto border-t border-white/50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold">
              Time[less] Travel
            </h3>
            <p className="font-body text-sm max-w-xs leading-relaxed">
              Helping travelers achieve their dream holidays and commemorate
              them afterwards. Plan, track, and share your adventures.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-action-info transition hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-action-info transition hover:underline"
                >
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/checklists"
                  className="hover:text-action-info transition hover:underline"
                >
                  Travel Planner
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-action-info transition hover:underline"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Socials (Placeholders) */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {/* You can replace these with real SVG icons later */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white p-2 rounded-full hover:bg-action-info hover:text-white transition shadow-sm"
              >
                <span className="sr-only">GitHub</span>
                🐙
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white p-2 rounded-full hover:bg-action-info hover:text-white transition shadow-sm"
              >
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white p-2 rounded-full hover:bg-action-info hover:text-white transition shadow-sm"
              >
                <span className="sr-only">Instagram</span>
                📸
              </a>
            </div>
            <p className="mt-4 text-xs font-body">
              &copy; {new Date().getFullYear()} Timeless Travel. All rights
              reserved.
            </p>
          </div>
          <p className="mt-4 text-xs font-body text-center md:col-span-3">
            &copy; {new Date().getFullYear()} Powered by{" "}
            <Link className="font-bold underline" to="https://missbott.online">
              Miss Bott.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
