import React from "react";
import Home from "./pages/Home";
import "./Tailwind.css";
import 'leaflet/dist/leaflet.css';
import TenantListing from "./pages/TenantListing";

function App() {
  return (
    <div>
      <TenantListing />
    </div>
  );
}

export default App;
