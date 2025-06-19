
import { Link } from "react-router-dom";

 
 const Profile = () => {
    return(
        <div className=" flex flex-row justify-center items-center gap-6 mt-16">
            <Link to="/ProfileForm" className="bg-blue-500 p-4">
            
                profile tenant
            </Link>  
            <Link to="/ProfileFormLandlord" className="bg-blue-500 p-4">
                profile Landlord
            </Link>
        </div>
    )
 }

 export default Profile;