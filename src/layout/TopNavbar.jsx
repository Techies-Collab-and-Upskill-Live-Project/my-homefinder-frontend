import { useState } from "react";
import topNav from "./TopNavbar.module.css";
import userImg from "../assets/user.png";
import { MdOutlineMessage, IoIosArrowDown, RxHamburgerMenu } from "../icons";

import logo from "../assets/HeroLogo.png";

const TopNavbar = ({ toggleMenu, showMenu }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    // <header className={topNav.header}>
    <header className={`${topNav.header} ${showMenu ? topNav.menuOpen : ""}`}>
      <div>
        <img src={logo} alt="MyHomeFinder logo" />
      </div>

      <nav className={topNav.nav}>
        <span className={topNav.link}>Dashboard</span>
        <span className={topNav.link}>Manage Property</span>
      </nav>

      <div className={topNav.right}>
        <MdOutlineMessage className={topNav.icon} />

        <div className={topNav.userSection} onClick={toggleDropdown}>
          <img src={userImg} alt="User" className={topNav.avatar} />
          <span>Lucy</span>
          <IoIosArrowDown />
          {showDropdown && (
            <div className={topNav.dropdown}>
              <span className={topNav.dropdownList}>Profile</span>
              <span className={topNav.dropdownList}>Support</span>
              <span>Logout</span>
            </div>
          )}
        </div>
      </div>

      <RxHamburgerMenu className={topNav.hamburger} onClick={toggleMenu} />
    </header>
  );
};
export default TopNavbar;
