// This is the Navbar component for reuse across needed pages
import { Link } from "react-router-dom";
import { nav_links } from "../data/data";
import Navbarlogo from "/images/Navbarlogo.svg";

const Navbar = () => {
  return (
    <nav className="bg-white padding_nav shadow-md fixed w-full z-50 flex items-center justify-between">
      <Link to="/">
        <div className="flex items-center">
          <img
            src={Navbarlogo}
            alt="MyHomeFinderLogo"
            className="h-20 w-auto object-contain"
          />
        </div>
      </Link>
      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        {nav_links.map((item, index) => (
          <span key={index}>
            <Link to={item.path}>
              <h5 className="hover:cursor-pointer font-semibold">
                {item.text}
              </h5>
            </Link>
          </span>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-2">
        <Link to="/TenantLogin">
          <button className="padding border border-green-600 text-green-600 text-lg rounded-lg hover:bg-green-50 transition cursor-pointer">
            Login
          </button>
        </Link>
        <button className="bg-green-600 padding text-white rounded-lg hover:bg--900 transition cursor-pointer">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
