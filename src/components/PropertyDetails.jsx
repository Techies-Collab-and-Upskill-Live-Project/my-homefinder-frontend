import { MapPin } from "@phosphor-icons/react";
import { mainProperty } from "../data/property";

const PropertyDetails = () => {
  const { name, location, description, amenities, rent, status } = mainProperty;

  return (
    <section className="bg-white rounded-xl shadow-md p-6 mt-4">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>

      <p className="flex items-center text-gray-600 mb-4">
        <MapPin className="text-xl mr-2" />
        {location}
      </p>

      <div className="mb-6">
        <p className="font-semibold text-lg mb-1">Property Description</p>
        <p className="text-gray-700">{description}</p>
      </div>

      <div className="mb-6">
        <p className="font-semibold text-lg mb-2">Amenities</p>
        <ul className="flex flex-wrap gap-3">
          {amenities.map((item) => (
            <li
              key={item.id}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <p className="mb-2">
        <span className="font-semibold">Rent/year:</span> #{rent}
      </p>
      <p>
        <span className="font-semibold">Apartment Status:</span> {status}
      </p>
    </section>
  );
};

export default PropertyDetails;
