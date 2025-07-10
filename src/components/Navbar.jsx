import { Link, useNavigate } from "react-router-dom";
import { nav_links } from "../data/data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbarlogo from "/images/Navbarlogo.svg";
import { List, SignOutIcon, UserCircleIcon, X } from "@phosphor-icons/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      try {
        const userName = storedUser.data.fullName;
        setUser(userName);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    Navigate("/");
  };

  const handleProfileClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const roleName = user?.data?.role?.name;

    if (roleName === "RENTER") {
      Navigate("/tenantprofile");
    } else if (roleName === "LANDLORD") {
      Navigate("/landlordProfile");
    } else {
      Navigate("/");
    }
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-[9999]">
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

        {/* Auth Buttons or Profile */}
        <div
          className="hidden cursor-pointer md:flex items-center gap-3"
          onClick={handleProfileClick}
        >
          {user ? (
            <div className="flex items-center gap-2">
              {user.image ? (
                <img
                  src={user.image}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="w-8 h-8 text-gray-600" />
              )}
              <span className="text-sm font-medium">
                {getGreeting()}, {user.split(" ")[1]}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-red-500 cursor-pointer ml-2"
              >
                <SignOutIcon size={20} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/tenantLogin">
                <button className="px-4 py-2 border border-green-600 text-green-600 text-sm rounded-md hover:bg-green-50 transition">
                  Login
                </button>
              </Link>
              <Link to="/tenantSignUpPage">
                <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
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
            className="md:hidden z-50 px-6 pt-4 pb-6"
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
              {user ? (
                <div
                  className="flex cursor-pointer items-center gap-2"
                  onClick={handleProfileClick}
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="w-8 h-8 text-gray-600" />
                  )}
                  <span className="text-sm font-medium">
                    {getGreeting()}, {user.split(" ")[1]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-red-500 cursor-pointer ml-2"
                  >
                    <SignOutIcon size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/tenantLogin">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full mb-2 px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition"
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/tenantSignUpPage">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
