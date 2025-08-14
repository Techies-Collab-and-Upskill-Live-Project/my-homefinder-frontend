import { recentlyRented } from "../data/property";

const RentedCard = () => {
  return (
    <section className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recently Rented</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentlyRented.map((property) => (
          <div
            key={property.id}
            className="bg-gray-100 rounded-lg overflow-hidden"
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col justify-between">
              <span>
                <p className="font-semibold text-lg">{property.name}</p>
                <p className="text-sm text-gray-500">{property.location}</p>
              </span>
              <p className="font-medium text-green-600 mt-2">
                {property.price}/year
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RentedCard;
