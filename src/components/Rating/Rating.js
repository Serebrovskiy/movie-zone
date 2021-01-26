import React from 'react';
import './Rating.css';
import RatingCard from './RatingCard'

function Rating({ onOpenPopupAddCard, ratingCards, onRemoveRatingCard, onUpRatingCard, onDownRatingCard }) {

  const [isReduceCards, setIsReduceCards] = React.useState(false);

  function handleReduceCards() {
    setIsReduceCards(!isReduceCards);
  }

  return (
    <div className="rating">
      <p className="rating__text">Рейтинг Фильмов</p>
      <div className="rating__container">
        <button className="rating__button-add" onClick={() => onOpenPopupAddCard(false)}>Добавить фильм</button>
        <button className={`rating__button-reduce ${isReduceCards && "rating__button-reduce_active"}`} onClick={handleReduceCards} />
      </div>
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
              isReduceCards={isReduceCards}
            />
          )
        }
      </div>
    </div>
  );
}

export default Rating;
