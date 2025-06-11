import rented from "./RentedCard.module.css";
import { recentlyRented } from "../data/property";

const RentedCard = () => {
  // const { name, location, image, price } = recentlyRented;
  return (
    <section className={rented.container}>
      <h2 className={rented.header}>Recently Rented</h2>
      <div className={rented.wrapper}>
        {recentlyRented.map((property) => (
          <div key={property.id} className={rented.card}>
            <img
              src={property.image}
              alt={property.name}
              className={rented.img}
            />
            <div className={rented.content}>
              <p className={rented.content_p}>{property.name}</p>
              <p className={rented.loc}>{property.location}</p>
              {/* ============I HAVE A BUG HERE, WILL FIX THE AMENITIES ARRAY LATER=============== */}
              {/* <ul className={rented.amenities}>
                {property.amenities.map((a) => (
                  <li className={rented.list} key={a.id}>
                    {a.label}
                  </li>
                ))}
              </ul> */}
              <p className={rented.content_p}>{property.price}/year</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default RentedCard;
