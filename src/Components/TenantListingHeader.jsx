import React, { useEffect, useState } from "react";

const TenantListingHeader = ({ properties }) => {
  const fallbackNames = [
    "Home Seeker",
    "Friend",
    "Happy Tenant",
    "Explorer",
    "Future Renter",
  ];
  const [name, setName] = useState("");

  const randomFallback = () => {
    const randomIndex = Math.floor(Math.random() * fallbackNames.length);
    return fallbackNames[randomIndex];
  };

  useEffect(() => {
    const storedAuthUser = localStorage.getItem("authUser");
    const storedUser = localStorage.getItem("user");

    const parseAndSetName = (data) => {
      try {
        const parsed = JSON.parse(data);
        const userName =
          parsed?.user?.fullName || parsed?.landlordProfile.fullName;
        setName(userName || randomFallback());
      } catch (error) {
        console.error("Error parsing user data:", error);
        setName(randomFallback());
      }
    };

    if (storedAuthUser) {
      parseAndSetName(storedAuthUser);
    } else if (storedUser) {
      parseAndSetName(storedUser);
    } else {
      setName(randomFallback());
    }
  }, []);

  return (
    <header>
      <h1 className="text-3xl mt-20 font-black mb-2">Hi {name},</h1>
      <p className="text-md font-semibold">
        We found <span className="text-[#0D7B0D]">{properties.length}</span>{" "}
        available houses
      </p>
      <small>Select and rent your dream house in the search list below</small>
    </header>
  );
};

export default TenantListingHeader;
