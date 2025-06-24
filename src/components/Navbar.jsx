import { Link } from "react-router-dom";
import { nav_links } from "../data/data";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbarlogo from "/images/Navbarlogo.svg";
import { List, X } from "@phosphor-icons/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center">
            <img
              src={Navbarlogo}
              alt="MyHomeFinderLogo"
              className="h-16 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {nav_links.map((item, index) => (
            <Link key={index} to={item.path}>
              <h5 className="text-sm font-semibold text-black hover:text-green-600 transition">
                {item.text}
              </h5>
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Link to="/TenantLogin">
            <button className="px-4 py-2 border border-green-600 text-green-600 text-sm rounded-md hover:bg-green-50 transition">
              Login
            </button>
          </Link>
          <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition">
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <List size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden px-6 pt-4 pb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4">
              {nav_links.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-green-600"
                >
                  {item.text}
                </Link>
              ))}
              <hr className="my-2" />
              <Link to="/TenantLogin">
                <button className="w-full mb-2 px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition">
                  Login
                </button>
              </Link>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
