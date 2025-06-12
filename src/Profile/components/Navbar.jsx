import React, { useState } from "react";
import MessageIcon from "../Assets/images/MessageIcon.png"
import UserImage from "../Assets/images/UserImage.png"
import Logo1 from "../Assets/images/Logo1.png"
import { Menu, X, Bell, Star, MessageSquare} from "lucide-react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useProfile } from "../Assets/ProfileContext";
import SearchBar from "../components/Search";
import ProfileMenu from "./ProfileMenu";

const Navbar = () =>{
    const [isOpen, setIsOpen] = React.useState(false);
    const [menuOpen, setMennuOpen] = useState(false);
    const location = useLocation();
    const { State } = useProfile();
    const navigate = useNavigate();
    const showTenantProfile = ['/TenantProfile'].includes(location.pathname);
    const showExtraItems = ['/landlordProfileListing', '/landlordProfileB4Listing'].includes(location.pathname);
    const  showForm = ['/ProfileForm', '/ProfileFormLandlord'].includes(location.pathname);
    const {  profileData } = useProfile();

    return(
        <nav className="py-1  shadow-lg gap-x fixed top-0 z-50 w-full bg-gray-50">
            <div className={`flex ${showForm ? "justify-between mx-10" : "md:justify-around md:mx-20" } justify-between mx-8 items-center`}>
                <img src={Logo1} alt="" className="w-20" />

                

                {/*Desktop screen*/}

                { showExtraItems && 
                    (<>
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                        <ul className="hidden md:flex gap-6 text-green-950 cursor-pointer">
                            <li className="text-gray-600 hover:text-gray-700 font-medium">Dashboard</li>
                            <Link to="/landlordProfileListing"> <li className="text-gray-600 hover:text-gray-700 font-medium">Manage Properties</li></Link>
                        </ul>

                        <div className="hidden md:flex gap-x-2 justify-center items-center">
                            <MessageSquare className="w-5" />
                            {profileData ? 
                                <img 
                                src={profileData.image} 
                                alt="" className="cover rounded-full w-7 h-7" /> :
                                <img 
                                src={UserImage}
                                alt="" className="w-7 h-7" />
                            }
                            <p className="text-sm">Favy Lucy</p>
                            <div className="flex flex-col relative">
                                <svg width="14" height="9" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setMennuOpen(!menuOpen)}>
                                    <path d="M0.330173 1.01556C0.541647 0.804252 0.828428 0.685547 1.12745 0.685547C1.42648 0.685547 1.71326 0.804252 1.92473 1.01556L7.50681 6.59488L13.0889 1.01556C13.3016 0.81024 13.5864 0.696631 13.8821 0.699199C14.1778 0.701767 14.4606 0.820307 14.6697 1.02929C14.8788 1.23827 14.9974 1.52097 15 1.8165C15.0025 2.11203 14.8889 2.39675 14.6834 2.60933L8.30409 8.98554C8.09261 9.19684 7.80583 9.31555 7.50681 9.31555C7.20778 9.31555 6.921 9.19684 6.70953 8.98554L0.330173 2.60933C0.118763 2.39796 0 2.11132 0 1.81244C0 1.51357 0.118763 1.22693 0.330173 1.01556Z" fill="black"/>
                                </svg>
                                {menuOpen && (<ProfileMenu />)}
                            </div>
                        </div>
                        
                    </>)
                }

                { showTenantProfile && 
                    (<>
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>

                        <ul className="hidden md:flex gap-16 text-green-950 cursor-pointer">
                            <li className="text-gray-600 hover:text-gray-700 font-medium">Rent</li>
                            <li className="text-gray-600 hover:text-gray-700 font-medium">Manage Rentals</li>
                        </ul>

                        <SearchBar />

                        <div className="hidden md:flex gap-x-3 justify-center items-center">
                            <Bell className="w-5" />
                            <MessageSquare className="w-5" />
                            <Star className="w-5" />
                            
                            {profileData ? 
                                <img 
                                src={profileData.image} 
                                alt="" className="cover rounded-full w-7 h-7" /> :
                                <img 
                                src={UserImage}
                                alt="" className="w-7 h-7" />
                            }
                           {profileData ? <p className="text-sm">{profileData.name}</p> : <p className="text-sm">Favy Lucy</p>}

                            <div className="flex flex-col relative">
                                <svg width="14" height="9" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setMennuOpen(!menuOpen)}>
                                    <path d="M0.330173 1.01556C0.541647 0.804252 0.828428 0.685547 1.12745 0.685547C1.42648 0.685547 1.71326 0.804252 1.92473 1.01556L7.50681 6.59488L13.0889 1.01556C13.3016 0.81024 13.5864 0.696631 13.8821 0.699199C14.1778 0.701767 14.4606 0.820307 14.6697 1.02929C14.8788 1.23827 14.9974 1.52097 15 1.8165C15.0025 2.11203 14.8889 2.39675 14.6834 2.60933L8.30409 8.98554C8.09261 9.19684 7.80583 9.31555 7.50681 9.31555C7.20778 9.31555 6.921 9.19684 6.70953 8.98554L0.330173 2.60933C0.118763 2.39796 0 2.11132 0 1.81244C0 1.51357 0.118763 1.22693 0.330173 1.01556Z" fill="black"/>
                                </svg>
                                {menuOpen && (<ProfileMenu />)}
                            </div>
                        </div>
                        
                    </>)
                }


                { showForm && (
                    <p className="text-green-600 cursor-pointer">Skip</p>
                )}
                
            </div>

            {/*mobile menu*/}
            {showExtraItems && 
                isOpen && (
                    <div className="flex flex-col justify-evenly items-center">
                        <ul className="flex gap-6 text-green-950 cursor-pointer">
                            <li>Dashboard</li>
                            <li>Manage Properties</li>
                        </ul>

                        <div className="flex gap-x-2 items-center">
                            <MessageSquare className="w-5" />
                            {profileData.image ? 
                                <img 
                                src={profileData.image} 
                                alt="" className="cover rounded-full w-7 h-7" /> :
                                <img 
                                src={UserImage}
                                alt="" className="w-7 h-7" />
                            }
                            <p className="text-sm">Favy Lucy</p>
                            <div className="flex flex-col relative">
                                <svg width="14" height="9" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setMennuOpen(!menuOpen)}>
                                    <path d="M0.330173 1.01556C0.541647 0.804252 0.828428 0.685547 1.12745 0.685547C1.42648 0.685547 1.71326 0.804252 1.92473 1.01556L7.50681 6.59488L13.0889 1.01556C13.3016 0.81024 13.5864 0.696631 13.8821 0.699199C14.1778 0.701767 14.4606 0.820307 14.6697 1.02929C14.8788 1.23827 14.9974 1.52097 15 1.8165C15.0025 2.11203 14.8889 2.39675 14.6834 2.60933L8.30409 8.98554C8.09261 9.19684 7.80583 9.31555 7.50681 9.31555C7.20778 9.31555 6.921 9.19684 6.70953 8.98554L0.330173 2.60933C0.118763 2.39796 0 2.11132 0 1.81244C0 1.51357 0.118763 1.22693 0.330173 1.01556Z" fill="black"/>
                                </svg>
                                {menuOpen && (<ProfileMenu />)}
                            </div>
                        </div>
                    </div>
                )
            }

            {showTenantProfile && 
                isOpen && (
                    <div className="flex justify-evenly items-center">
                        <ul className="flex gap-x-8 justify-evenly text-green-950 cursor-pointer">
                            <li className="text-gray-600 hover:text-gray-900 font-medium">Rent</li>
                            <li className="text-gray-600 hover:text-gray-900 font-medium">Manage Rentals</li>
                        </ul>

                        
                        <div className="md:hidden flex gap-x-3 justify-center items-center">
                            <Bell className="w-5" />
                            <MessageSquare className="w-5" />
                            <Star className="w-5" />
                            
                            {profileData ? 
                                <img 
                                src={profileData.image} 
                                alt="" className="cover rounded-full w-7 h-7" /> :
                                <img 
                                src={UserImage}
                                alt="" className="w-7 h-7" />
                            }
                           {profileData ? <p className="text-sm">{profileData.name}</p> : <p className="text-sm">Favy Lucy</p>}

                            <div className="flex flex-col relative">
                                <svg width="14" height="9" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setMennuOpen(!menuOpen)}>
                                    <path d="M0.330173 1.01556C0.541647 0.804252 0.828428 0.685547 1.12745 0.685547C1.42648 0.685547 1.71326 0.804252 1.92473 1.01556L7.50681 6.59488L13.0889 1.01556C13.3016 0.81024 13.5864 0.696631 13.8821 0.699199C14.1778 0.701767 14.4606 0.820307 14.6697 1.02929C14.8788 1.23827 14.9974 1.52097 15 1.8165C15.0025 2.11203 14.8889 2.39675 14.6834 2.60933L8.30409 8.98554C8.09261 9.19684 7.80583 9.31555 7.50681 9.31555C7.20778 9.31555 6.921 9.19684 6.70953 8.98554L0.330173 2.60933C0.118763 2.39796 0 2.11132 0 1.81244C0 1.51357 0.118763 1.22693 0.330173 1.01556Z" fill="black"/>
                                </svg>
                                {menuOpen && (<ProfileMenu />)}
                            </div>
                        </div>
                    </div>
                )}
        </nav>
        
    )
}

export default Navbar;