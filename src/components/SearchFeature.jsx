import React from "react";
// import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const SearchFeature = () =>{
  return (
    <div className="font-sans text-gray-800">     

      {/* Search Form */}
      <section className="mt-0 mb-6 px-4">
        <div className="max-w-4xl m-auto bg-white shadow-lg rounded-lg p-6">
          <div className="-mt-10 max-w-4xl flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div>
              <label className="sr-only">Tab</label>
              <div className="flex border rounded-lg overflow-hidden">
                <button className="px-4 py-2 bg-white text-green-600 font-semibold border-r">Rent</button>
                <button className="px-4 py-2 text-gray-600">Lease</button>
              </div>
            </div>
            <div className="max-w-full h-35 -mt-10 mx-38 grid-rows-3">
            <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Property Type</option>
              <option value="apartment">Apartment</option>
        <option value="duplex">Duplex</option>
        <option value="studio">Studio</option>
            </select>
            <select className="flex-1 border rounded-lg px-4 py-2">
              <option>Location</option>
              <option value="lagos">Lagos</option>
        <option value="abuja">Abuja</option>
        <option value="portharcourt">Port Harcourt</option>
            </select>
            <select className="flex-1 border rounded-lg px-4 py-2">
              <option>Price</option>
              <option>2,000,000</option>
              <option>500,000</option>
            </select>
            <div className="md:w-48 m-4 flex justify-center   bg-green-600  text-white rounded-lg px-4 py-2">
            <button className="   ">Search</button>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="explore" className="px-4 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Choose MyHomeFinder?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {['Trustworthy','Reliable','Fast Response','Communication'].map((title) => (
            <div key={title} className="bg-white border rounded-lg p-6 text-center">
              <img src={`/icons/${title.toLowerCase().replace(/ /g, '-')}.svg`} alt={title} className="h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600">All Photos, documents, and IDs are verified to prevent scams. Trust is everything in rentals.</p>
            </div>
          ))}
        </div>
      </section>     
    </div>
  );
}
export default SearchFeature