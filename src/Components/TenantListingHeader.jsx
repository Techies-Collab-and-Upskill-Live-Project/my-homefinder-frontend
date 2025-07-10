import React, { useEffect, useState } from "react";

const TenantListingHeader = () => {
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
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const userName = user.data.fullName;
        setName(userName || randomFallback());
      } catch (error) {
        console.error("Error parsing user data:", error);
        setName(randomFallback());
      }
    } else {
      setName(randomFallback());
    }
  }, []);

  return (
    <header>
      <h1 className="text-3xl mt-20 font-black mb-2">Hi {name},</h1>
      <p className="text-md font-semibold">
        We found <span className="text-[#0D7B0D]">120</span> homes In Lagos that
        match your search
      </p>
      <small>Select and rent your dream house in the search list below</small>
    </header>
  );
};

export default TenantListingHeader;
