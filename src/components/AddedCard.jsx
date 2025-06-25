import { recentlyAdded } from "../data/property";

const AddedCard = () => {
  return (
    <section className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recently Added</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentlyAdded.map((added) => (
          <div
            key={added.id}
            className="bg-gray-100 rounded-lg overflow-hidden"
          >
            <img
              src={added.image}
              alt={added.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <p className="font-semibold text-lg">{added.name}</p>
              <p className="text-sm text-gray-500">{added.location}</p>
              <p className="font-medium text-green-600 mt-2">{added.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddedCard;
