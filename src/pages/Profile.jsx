import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="relative flex flex-row justify-center items-center gap-6">
      <div className="my-[200px]">
        <Link to="/ProfileForm" className="bg-blue-500 p-4">
      <button>
        Profile Tenant
      </button>
      </Link>
      </div>
      <div className="my-[200px]">
        <Link to="/ProfileFormLandlord" className="bg-blue-500 p-4">
      <button>
        Profile Landlord
      </button>
      </Link>
      </div>
    </div>
  );
};

export default Profile;
