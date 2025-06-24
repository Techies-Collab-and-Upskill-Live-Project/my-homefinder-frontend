import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./layout/Layout";
import "./index.css";
// import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
