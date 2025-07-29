import { Link, useNavigate } from "react-router-dom";
import { nav_links, auth_links } from "../data/data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbarlogo from "/images/Navbarlogo.svg";
import {
  ChatIcon,
  List,
  SignOutIcon,
  UserCircleIcon,
  X,
} from "@phosphor-icons/react";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [navLinks, setNavLinks] = useState(nav_links);

  useEffect(() => {
    const fetchUserById = async () => {
      const stored = localStorage.getItem("user");

      if (!stored) {
        setNavLinks(nav_links);
        return;
      }
      try {
        const parsed = JSON.parse(stored);
        const userId = parsed?.user?.id;
        const token = parsed?.token?.token;

        if (!userId || !token) {
          setNavLinks(nav_links);
          return;
        }
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.setItem("authUser", JSON.stringify(data));

        const fullName =
          data?.landlordProfile?.fullName || data?.tenantProfile?.fullName;
        const image =
          data?.landlordProfile?.profileImage ||
          data?.tenantProfile?.profileImage;

        setUser(fullName || "User");
        setProfileImage(image || null);
        setNavLinks(auth_links);
      } catch (err) {
        console.error("Failed to fetch user by ID:", err);
        setUser(null);
        setProfileImage(null);
      }
    };

    fetchUserById();
  }, []);

  const handleSmoothScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authUser");
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };
  const isAuthenticated =
    localStorage.getItem("user") || localStorage.getItem("authUser");

  const handleProfileClick = () => {
    setIsOpen(false);
    const userData = JSON.parse(localStorage.getItem("user"));
    const roleName = userData?.role || userData?.user?.role.name;

    if (roleName === "RENTER" || roleName === "renter") {
      navigate("/tenantprofile");
    } else if (roleName === "LANDLORD" || roleName === "landlord") {
      navigate("/landlordProfile");
    } else {
      navigate("/");
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
          {navLinks.map((item, index) =>
            item.scroll ? (
              <button
                key={index}
                onClick={() => handleSmoothScroll(item.path)}
                className="text-sm font-semibold text-black hover:text-green-600 transition"
              >
                {item.text}
              </button>
            ) : (
              <Link
                key={index}
                to={item.path}
                className="text-sm font-semibold text-black hover:text-green-600 transition"
              >
                {item.text}
              </Link>
            )
          )}
        </div>

        {/* Auth Buttons or Profile */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-4 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer">
              {/* Profile Icon */}
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="w-8 h-8 text-gray-600" />
              )}

              {/* Greeting Text */}
              <span
                className="text-sm font-semibold text-gray-700"
                onClick={handleProfileClick}
              >
                {getGreeting()}, {user?.split(" ")[0] || "User"}
              </span>

              {/* Message Icon */}
              <Link to="/messages">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/messages");
                  }}
                  title="Messages"
                  className="text-gray-600 hover:text-green-500 transition"
                >
                  <ChatIcon size={18} />
                </button>
              </Link>

              {/* Logout Icon */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="text-red-500 hover:bg-red-600 hover:text-white p-2 transition ease-in-out duration-300"
              >
                <SignOutIcon size={18} />
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
              {nav_links.map((item, index) =>
                item.scroll ? (
                  <button
                    key={index}
                    onClick={() => handleSmoothScroll(item.path)}
                    className="text-sm font-medium text-left text-gray-700 hover:text-green-600"
                  >
                    {item.text}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-left text-gray-700 hover:text-green-600"
                  >
                    {item.text}
                  </Link>
                )
              )}

              <hr className="my-2" />
              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-4 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer">
                  <span className="flex items-center gap-2">
                    {/* Profile Icon */}
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="w-8 h-8 text-gray-600" />
                    )}
                    {/* Greeting Text */}
                    <span
                      className="text-sm font-semibold text-gray-700"
                      onClick={handleProfileClick}
                    >
                      {getGreeting()}, {user?.split(" ")[0] || "User"}
                    </span>
                  </span>

                  <span className="flex items-center gap-2">
                    {/* Message Icon */}
                    <Link to="/messages">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/messages");
                        }}
                        title="Messages"
                        className="text-gray-600 hover:text-green-500 transition"
                      >
                        <ChatIcon size={18} />
                      </button>
                    </Link>

                    {/* Logout Icon */}
                    <button
                      onClick={handleLogout}
                      title="Logout"
                      className="text-red-500 hover:bg-red-600 hover:text-white p-2 transition ease-in-out duration-300"
                    >
                      <SignOutIcon size={18} />
                    </button>
                  </span>
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
