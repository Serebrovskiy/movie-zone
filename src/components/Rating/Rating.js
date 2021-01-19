import React from 'react';
import './Rating.css';
import RatingCard from './RatingCard'

function Rating({ onOpenPopupRating, ratingCards, onRemoveRatingCard, onUpRatingCard, onDownRatingCard }) {


  // function handlePopup() {

  // }

  return (
    <div className="rating">
      <p className="rating__text">Рейтинг Фильмов</p>
      <button className="rating__button-add" onClick={onOpenPopupRating}>Добавить фильм</button>
      <div className="rating__place">
        {
          ratingCards.map(elem =>
            <RatingCard
              item={elem}
              key={elem.id}
              ratingCards={ratingCards}
              onRemoveRatingCard={onRemoveRatingCard}
              onUpRatingCard={onUpRatingCard}
              onDownRatingCard={onDownRatingCard}
            />
          )
        }
      </div>
    </div>
  );
}

export default Rating;
