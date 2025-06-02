import details from "./PropertyDetails.module.css";
import { mainProperty } from "../data/property";
import {
  IoLocationOutline,
  MdOutlineBed,
  MdOutlineBathroom,
  FaSwimmingPool,
  IoMdWine,
} from "../icons";

//  this is the property deatils c ard that contains name, location, amenities, rent, status.
const PropertyDetails = () => {
  // Destructuring the mainProperty object to get the required details
  const { name, location, description, amenities, rent, status } = mainProperty;
  return (
    // Main container for the property details
    <section className={details.detailsContainer}>
      <h2 className={details.title}>{name}</h2>

      <p className={details.location}>
        <IoLocationOutline className={details.icon} />
        {location}
      </p>

      <div className={details.descriptionContainer}>
        <p className={details.descriptionHeader}>Property Description</p>
        <p className={details.descriptionContent}>{description}</p>
      </div>
      <div className={details.amenities}>
        <p className={details.descriptionHeader}>Amenities</p>
        {/* ============ I HAVE A BUG HERE, WILL FIX THE STYLE LAYOUT LATER================= */}

        <ul className={details.item}>
          {amenities.map((item) => (
            <li className={details.list} key={item.id}>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <p className={details.rent}>
        <span className={details.spanRent}>Rent/year:</span> # {rent}
      </p>
      <p className={details.status}>
        <span className={details.spanRent}>Apartment Staus:</span> {status}
      </p>
    </section>
  );
};

export default PropertyDetails;
