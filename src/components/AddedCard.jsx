import add from "./AddedCard.module.css";
import { recentlyAdded } from "../data/property";

const AddedCard = () => {
  return (
    <section className={add.container}>
      <h2 className={add.header}>Recently Added</h2>
      <div className={add.wrapper}>
        {recentlyAdded.map((added) => (
          <div key={added.id} className={add.card}>
            <img src={added.image} alt={add.name} className={add.img} />
            <div className={add.content}>
              <p className={add.content_p}>{added.name}</p>
              <p className={add.loc}>{added.location}</p>
              <p className={add.content_p}>{added.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default AddedCard;
