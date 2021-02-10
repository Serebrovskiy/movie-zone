import React from 'react';
import './RatingCard.css';

function RatingCard({
  item,
  ratingCards,
  onRemoveRatingCard,
  onUpRatingCard,
  onDownRatingCard,
  isReduceCards,
  pathname
}) {
  // const [isDisabledUp, setIsDisabledUp] = React.useState(false);
  // const [isDisabledDown, setIsDisabledDown] = React.useState(false);

  const handleRemoveClick = () => {
    onRemoveRatingCard(item);
  }
  const handleArrowUpClick = () => {
    onUpRatingCard(item);
  }

  const handleArrowDownClick = () => {
    onDownRatingCard(item);
  }

  return (
    <div className={`rating-card ${isReduceCards && "rating-card_reduce"}  ${item.new && "rating-card_new"}`}>
      {item.new && <p className={`rating-card_text-new ${isReduceCards && "rating-card_text-new_reduce"}`} >NEW!</p>}
      <p className="rating-card__number">{item.position}</p>
      <div className={`rating-card__container-center ${isReduceCards && "rating-card__container-center_reduce"}`}>
        <p className={`rating-card__name ${isReduceCards && "rating-card__name_reduce"}`}>{item.name}</p>
        <p className={`rating-card__date ${isReduceCards && "rating-card__date_reduce"}`}>{item.date} г.</p>
      </div>
      {/* Если убирать совсем */}
      {/* {!isReduceCards && <img className="rating-card__image" src={item.link} alt={item.name} />} */}
      <img className={`rating-card__image ${isReduceCards && "rating-card__image_reduce"}`} src={item.link} alt={item.name} />

      {
        (pathname === '/rating') &&  //если актуальный адрес rating значит это карточки хозяина
        <div className={`rating-card__container-buttons ${isReduceCards && "rating-card__container-buttons_reduce"}`} >
          <button
            className={`rating-card__button-up ${isReduceCards && "rating-card_buttons_reduce"} ${item.position === 1 && "rating-card__button-up_disabled"}`}
            type="button"
            onClick={handleArrowUpClick}
            disabled={item.position === 1}
          />
          <button
            className={`rating-card__button-delete ${isReduceCards && "rating-card_buttons-delete_reduce"}`}
            type="button"
            onClick={handleRemoveClick}
          />
          <button
            className={`rating-card__button-down ${isReduceCards && "rating-card_buttons_reduce"} ${item.position === ratingCards.length && "rating-card__button-down_disabled"}`}
            type="button"
            onClick={handleArrowDownClick}
            disabled={item.position === ratingCards.length}
          />
        </div>
      }
    </div>
  );
}

export default RatingCard;