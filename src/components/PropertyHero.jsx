import { useState } from "react";
import hero from "./PropertyHero.module.css";

const images = [
  "/images/House1.png",
  "/images/House2.png",
  "/images/House3.png",
  "/images/House4.png",
  "/images/House5.png",
];

const PropertyHero = () => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className={hero.heroContainer}>
      {/* Hero Main Image */}
      <h1 className={hero.title}>Property</h1>
      <div className={hero.mainImageContainer}>
        <img src={mainImage} alt="Main property" className={hero.mainImage} />
      </div>

      {/* Carousel Thumbnails */}
      <div className={hero.carouselContainer}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`${hero.thumbnail} ${
              mainImage === img ? hero.active : ""
            }`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyHero;
