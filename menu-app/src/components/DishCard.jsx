import React from "react";
import ImageSlider from "./ImageSlider";

export default function DishCard({ dishName, images }) {
  return (
    <div className="dish-card-large">
      <ImageSlider images={images} />
      <h3 className="dish-title-large">{dishName}</h3>
    </div>
  );
}

