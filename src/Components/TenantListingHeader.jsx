import React from "react";

const TenantListingHeader = () => {
  return (
    <>
      <header>
        <h1 className="text-3xl font-black mb-2">Hi Fav Lucy,</h1>
        <p className="text-md font-semibold">
          We found <span className="text-[#0D7B0D]">120</span> homes In lagos
          that matches your search
        </p>
        <small>Select and rent your dream house in the search list below</small>
      </header>
    </>
  );
};

export default TenantListingHeader;
