import React from 'react';
import './Rating.css';
import RatingCard from './RatingCard'

function Rating({ onOpenPopupRating, ratingCards, onRemoveRatingCard, onUpRatingCard }) {


  // function handlePopup() {

  // }

  return (
    <div className="rating">
      <p className="rating__text">Rating</p>
      <button className="rating__button-add" onClick={onOpenPopupRating}>Добавить фильм</button>
      <div className="rating__place">
        {
          ratingCards.map(elem =>
            <RatingCard
              item={elem}
              key={elem.id}
              onRemoveRatingCard={onRemoveRatingCard}
              onUpRatingCard={onUpRatingCard}
            />
          )
        }
      </div>
    </div>
  );
}

export default Rating;
