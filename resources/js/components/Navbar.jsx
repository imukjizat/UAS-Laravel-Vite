import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full z-50">
      <nav className="leading-normal bg-transparent px-6 py-11 flex items-center">
        {/* Bagian Logo */}
        <div className="absolute left-14 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
          <a href="/">
            <img src="./Landing Page/logo.png" alt="Logo" className="w-10 h-10" />
          </a>
          <a href="/" className="text-black font-semibold text-3xl">
            TaskMaster
          </a>
        </div>

        {/* Bagian Navigasi */}
        <ul className="mx-auto flex space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-black text-xl active" : "text-black text-xl"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                isActive ? "text-black text-xl active" : "text-black text-xl"
              }
            >
              Features
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/how-it-works"
              className={({ isActive }) =>
                isActive ? "text-black text-xl active" : "text-black text-xl"
              }
            >
              How it Works
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-black text-xl active" : "text-black text-xl"
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
