import React from 'react';
import './RatingCard.css';

function RatingCard({ item }) {
  // console.log(key)

  return (
    <div className="rating-card">
      <p className="rating-card__number">{item.position}</p>
      <p className="rating-card__name">{item.name}</p>
      <img className="rating-card__image" src={item.link} alt={item.name} />
      <div className="rating-card__container-buttons" >
        <button className="rating-card__button-up" type="button"></button>
        <button className="rating-card__button-delete" type="button"></button>
        <button className="rating-card__button-down" type="button"></button>
      </div>
    </div>
  );
}

export default RatingCard;