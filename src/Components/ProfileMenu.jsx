

const ProfileMenu = () => {
    return(
        <div className=" absolute top-7 transition ease-in-out -right-3 w-40 bg-white border border-green-500 rounded-lg z-50 shadow-lg ">
            <ul className="py- text-sm text-gray-700">
                <li className="block px-4 py-2 rounded-t-lg bg-green-600 text-white text-center cursor-pointer">Profile</li>
                <div className="w-full border border-green-500"></div>
                <li className="block px-4 py-2 rounded-t-lg text-center cursor-pointer">Support</li>
                <div className="w-full border border-green-500"></div>
                <li className="block px-4 py-2 rounded-t-lg text-center cursor-pointer">Logout</li>
            </ul>  
        </div>
    )
}

export default ProfileMenu;