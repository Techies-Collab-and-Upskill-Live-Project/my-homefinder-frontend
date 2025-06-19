// This is the Navbar component for reuse across needed pages
import Navbarlogo from "/images/Navbarlogo.svg";

const Navbar = () =>{
    return(
        <nav className="bg-white shadow-md px-10 py-0 flex items-center justify-between">
            <div className="flex items center pl-4 ml-4">
                <img src={Navbarlogo} alt="MyHomeFinderLogo" className="h-20 w-auto object-contain"/>
            </div>
            {/* Navigation Links */}
            <ul className="flex space-x-6 text-gray-700 font-medium m-0">
                <li><a href="/" className="hover:text-green-600 transition">Explore</a></li>
                <li><a href="/" className="hover:text-green-600 transition">About Us</a></li>
                <li><a href="/" className="hover:text-green-600 transition">How it Works</a></li>
            </ul>
            {/* Auth Buttons */}
            <div className="flex space-x-2 m-0">
                <button className="px-10 py-10 border border-green-600 text-green-600 text-lg rounded-lg hover:bg-green-50 transition cursor-pointer">Login</button>
                <button className="px-10 py-10 mr-4 bg-green-600 text-white rounded-lg hover:bg--900 transition cursor-pointer">Sign Up</button>
            </div>
            
        </nav>
    )
}

export default Navbar; 