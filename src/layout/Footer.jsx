import footer from "./footer.module.css";
import footerImg from "../assets/FooterLogo.png";
import {
  IoCallOutline,
  MdOutlineMailOutline,
  IoLocationOutline,
} from "../icons";
const Footer = () => {
  return (
    <footer className={footer.container}>
      {/* Footer Content */}
      <div className={footer.content}>
        <div className={footer.contact}>
          <div className={footer.logo}>
            <img src={footerImg} alt="logo" />
            <p className={footer.logoTitle}>MyHomeFinder</p>
          </div>
          <div className={footer.description}>
            <IoLocationOutline className={footer.icon} />
            <p>
              5123 Market St. #22B <br />
              Charlottesvile, California 44635
            </p>
          </div>
          <p className={footer.contactInfo}>
            <IoCallOutline className={footer.icon} />
            <span>(434)546-4356</span>
          </p>
          <p className={footer.contactInfo}>
            <MdOutlineMailOutline className={footer.icon} />
            <span>contact@lift.agancyr.com</span>
          </p>
        </div>

        {/* Navigation Links */}
        <ul>
          <li>Home</li>
          <li>Explore</li>
          <li>About Us</li>
          <li>How it works</li>
        </ul>

        {/* Social Links */}
        <ul>
          <li>
            <h4>Socials</h4>
          </li>
          <li>Facebook</li>
          <li>LinkedIn</li>
          <li>Instagram</li>
          <li>X</li>
        </ul>

        {/* NewsLetter Subcribtion */}
        <div className={footer.newsletter}>
          <h3>Subscribe to our Newsletter</h3>
          <input type="email" name="email" placeholder="Email" />
          <button className="btn">Send</button>
        </div>
      </div>
      {/* Copyright */}
      <div className={footer.copyright}>
        <p className={footer.copyrightText}>
          &copy; {new Date().getFullYear()} MYHomeFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
