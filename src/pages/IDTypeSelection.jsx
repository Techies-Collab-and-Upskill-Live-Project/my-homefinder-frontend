import React from "react";
import { useNavigate } from "react-router-dom";

export default function IDTypeSelection() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")).user;

  const IDtypes = [
    {
      id: "1",
      name: "Driver's License",
      image: "/images/DriverID.png",
      route: "/idDetails",
    },
    {
      id: "2",
      name: "National ID card",
      image: "/images/NationalID.png",
      route: "/idDetails",
    },
    {
      id: "3",
      name: "Passport",
      image: "/images/Passport.png",
      route: "/idDetails",
    },
  ];

  const handleSelection = (route, selectedIDType) => {
    const sanitizedIDType = selectedIDType.name.replace(/[^a-zA-Z0-9]/g, "");
    localStorage.setItem("selectedIDType", sanitizedIDType);
    navigate(route);
    window.location.reload();
  };

  return (
    <section className="h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Verify Your Identity
        </h1>
        <p className="text-lg mt-4 font-medium text-gray-700">Select ID Type</p>
        <p className="text-sm text-gray-500 mb-6">
          Which photo ID would you like to use?
        </p>

        <div className="flex flex-col gap-4">
          {IDtypes.map((idType) => (
            <button
              key={idType.id}
              onClick={() => handleSelection(idType.route, idType)}
              className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-xl hover:shadow-md transition-all duration-200 hover:bg-gray-100"
            >
              <span className="text-gray-800 font-medium">{idType.name}</span>
              <img
                src={idType.image}
                alt={idType.name}
                className="w-12 h-12 object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
