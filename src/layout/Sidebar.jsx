import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { id: 1, name: "Overview", path: "/overview" },
  { id: 2, name: "Properties", path: "/property" },
  { id: 3, name: "Tenants", path: "/tenants" },
  { id: 4, name: "Maintenance", path: "/maintenance" },
  { id: 5, name: "Account", path: "/account" },
  { id: 6, name: "Settings", path: "/settings" },
  { id: 7, name: "Logout", path: "/logout" },
];

const Sidebar = ({ className }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(1);

  return (
    <aside
      className={`bg-white w-64 h-[500px] p-6 shadow-md z-30 transform transition-transform duration-300 ${
        className ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:relative fixed top-16 left-0`}
    >
      <ul className="flex flex-col gap-4">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <li
              key={link.id}
              onClick={() => setActiveItem(link.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {/* Icon can be added here */}
              <Link to={link} className="flex items-center gap-3 w-full">
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
