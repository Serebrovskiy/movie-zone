import React from 'react';
import './RatingCard.css';

function RatingCard({ item, onRemoveRatingCard, onUpRatingCard }) {
  // console.log(key)
  const handleRemoveClick = () => {
    onRemoveRatingCard(item);
  }
  const handleArrowUpClick = () => {
    onUpRatingCard(item);
  }

  return (
    <div className="rating-card">
      <p className="rating-card__number">{item.position}</p>
      <p className="rating-card__name">{item.name}</p>
      <img className="rating-card__image" src={item.link} alt={item.name} />
      <div className="rating-card__container-buttons" >
        <button
          className="rating-card__button-up"
          type="button"
          onClick={handleArrowUpClick}
        />
        <button
          className="rating-card__button-delete"
          type="button"
          onClick={handleRemoveClick}
        />
        <button className="rating-card__button-down" type="button" />
      </div>
    </div>
  );
}

export default RatingCard;