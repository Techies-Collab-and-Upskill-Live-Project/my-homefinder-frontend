import { useState } from "react";


const navLinks = [
  { id: 1, name: "Overview", path: "/overview", icon: "" },
  { id: 2, name: "Properties", path: "/property", icon: "" },
  { id: 3, name: "Tenants", path: "/tenants", icon: "" },
  { id: 4, name: "Maintenance", path: "/maintenance", icon: "" },
  { id: 5, name: "Account", path: "/account", icon: "" },
  { id: 6, name: "Settings", path: "/settings", icon: "" },
  { id: 7, name: "Logout", path: "/logout", icon: "" },
];

const Sidebar = ({ className }) => {
  const [activeItem, setActiveItem] = useState(1);
  return (
    <aside className={`${sidebar.asideNav} ${className ? sidebar.show : ""}`}>
      <ul className={sidebar.list}>
        {navLinks.map((link) => (
          <li
            key={link.id}
            onClick={() => setActiveItem(link.id)}
            className={` ${sidebar.li} ${
              activeItem === link.id ? sidebar.active : ""
            }`}
          >
            <span className={sidebar.icon}>{link.icon}</span>
            <span>{link.name}</span>
          </li>
        ))}
        {/* <li>come</li> */}
      </ul>
    </aside>
  );
};
export default Sidebar;
