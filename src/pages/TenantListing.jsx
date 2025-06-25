import React from "react";
import TenantListingHeader from "../Components/TenantListingHeader";
import TenantListingSidebar from "../Components/TenantListingSidebar";
import TenantListingHouses from "../Components/TenantListingHouses";

const TenantListing = () => {
  return (
    <main className="lg:p-20 p-8">
      <TenantListingHeader />
      <TenantListingHouses />
    </main>
  );
};

export default TenantListing;
