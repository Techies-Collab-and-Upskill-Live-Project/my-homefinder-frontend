// // App.js or App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignUpPage from "../Component/SignUpPage";
// import HomePage from "../Component/homepage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/login" element={<HomePage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "../Component/Landlord/LandlordSignUpPage";
import HomePage from "../Component/Landlord/LandlordLogin";
import TenantSignUpPage from "../Component/Tenant/TenantSignUpPage";
import TenantLogin from "../Component/Tenant/TenantLogin"

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/landlordsignup" element={<SignUpPage />} />   {/*landlord*/}
         <Route path="/signup" element={<TenantSignUpPage />} />
         <Route path="/login" element={<TenantLogin/>}></Route>
        <Route path="/landlordlogin" element={<HomePage />} />

        {/* Optional: Catch-all route for unmatched paths */}
        <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
