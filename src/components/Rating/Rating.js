import React from 'react';
import './Rating.css';
import RatingCard from './RatingCard'

function Rating({ onOpenPopupRating, ratingFilms }) {


  // function handlePopup() {

  // }

  return (
    <div className="rating">
      <p className="rating__text">Rating</p>
      <button className="rating__button-add" onClick={onOpenPopupRating}>Добавить фильм</button>
      <div className="rating__place">
        {
          ratingFilms.map(elem =>
            <RatingCard
              item={elem}
              key={elem.id}
            />
          )
        }
      </div>
    </div>
  );
}

export default Rating;
