import React from 'react';
import './Rating.css';
import RatingCard from './RatingCard'

function Rating({
  onOpenPopupAddCard,
  ratingCards,
  onRemoveRatingCard,
  onUpRatingCard,
  onDownRatingCard,
  pathname
}) {
  const [isReduceCards, setIsReduceCards] = React.useState(false); //сжатие карочек 

  function handleReduceCards() {
    setIsReduceCards(!isReduceCards);
  }

  return (
    <div className="rating">
      <p className="rating__text">Ваш рейтинг фильмов</p>
      <div className="rating__container">
        <button className="rating__button-add" onClick={() => onOpenPopupAddCard(false)}>Добавить фильм</button>
        <button className={`rating__button-reduce ${isReduceCards && "rating__button-reduce_active"}`} onClick={handleReduceCards} />
      </div>
      <div className="rating__place">
        {
          ratingCards.length === 0
            ?
            <p className="following__place-text" >У вас еще нет фильмов в рейтинге</p>
            :
            ratingCards.map(elem =>
              <RatingCard
                item={elem}
                key={elem._id}
                ratingCards={ratingCards}
                onRemoveRatingCard={onRemoveRatingCard}
                onUpRatingCard={onUpRatingCard}
                onDownRatingCard={onDownRatingCard}
                isReduceCards={isReduceCards}
                pathname={pathname}
              />
            )
        }
      </div>
    </div>
  );
}

export default Rating;
