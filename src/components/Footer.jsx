// This is the Footer componenet for reuse across needed pages
import Navbarlogo from "../assets/Navbarlogo.svg";
import {PhoneIcon, EnvelopeSimpleIcon, MapPinIcon} from "@phosphor-icons/react";

const Footer = () => {
    return(
        <Footer className="bg-white border-t border-green-600 text-gray-700">
            <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand & Contact */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <img src={Navbarlogo} alt="MyHomeFinderLogo" className="h-8 w-auto" />
                        <span className="text-2xl font-bold text-green-600">MyHomeFinder</span>
                    </div>
                    <p className="text-sm">5123 Market St., #22B <br /><span className="inline-block"><MapPinIcon size={20} weight="bold" /></span>
                    Charlottesville, California 44635</p>
                    <p className="text-sm flex items-center space-x-2"><span className="inline-block"><PhoneIcon size={20} weight="bold" /></span><a href="tel: +2344345464356" className="hover:text-green-600">
                        434-546-4356</a></p>
                    <p className="text-sm flex items-center space-x-2"><span className="inline-block"><EnvelopeSimpleIcon size={20} weight="bold" /></span><a href="mailto:contact@lift.agency" className="hover:text-green-600">
                        contact@myhomefinder.com</a></p>
                </div>
                {/* Quick Links */}
                <div>
                    <h3 className="mb-3 font-semibold">Quick Links</h3>
                    <ul className="space-y-2 text-sm cursor-pointer">
                        {["Home", "Explore", "About Us", "How it works"].map((link) => (
                            <li key={link}>
                                <a href="/landing" className="hover:text-green-600">{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Socials */}
                <div>
                    <h3 className="mb-3 font-semibold">Socials</h3>
                    <ul className="space-y-2 text-sm">
                        {["Facebook", "LinkedIn", "Instagram", "X"].map((social) => (
                            <li key={social}>
                                <a href="/" className="hover:text-green-600">{social}</a>
                            </li>
                        ))};
                    </ul>
                </div>
                {/* Newsletter */}
                <div>
                    <h3 className="mb-3 font-semibold">Subscribe to our Newsletter</h3>
                    <form className="flex space-x-2">
                        <input 
                            type="email"
                            placeholder="Enter your Email here"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-1-md focus:outline-none
                            focus:ring-2 focus:ring-green-400" />
                        <button type="submit"
                                className="px-4 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition"
                                > Send
                        </button>
                    </form>
                </div>
            </div>
            {/* Bottom Copyright */}
            <div className="border-t border-green-600 mt-10 pt-4">
                <p className="text-center text-sm text-gray-500">© 2025 MyHomeFinder. All rights reserved.</p>
            </div>
        </Footer>
    );
};

export default Footer;