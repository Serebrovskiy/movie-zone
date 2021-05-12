import React from 'react';
import RatingCardsContext from '../../contexts/RatingCardsContext';
import './RatingCard.css';

function RatingCard({
  item,
  onRemoveRatingCard,
  onUpRatingCard,
  onDownRatingCard,
  isReduceCards,
  pathname
}) {
  const ratingCards = React.useContext(RatingCardsContext);

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
    // ссылка работает если заходим с /rating-top т.к там карточки из films, а тут у viewedUser из users.ratingCards следовательно разные id
    // <Link to={pathname === "/rating-top" ? `films/${item.id}` : '#'} style={{ textDecoration: 'none' }}>
    <div className={`rating-card ${isReduceCards && "rating-card_reduce"}  ${item.new && "rating-card_new"}  ${(pathname === '/rating-top') && "rating-card_top"}`}>
      {item.new && <p className={`rating-card_text-new ${isReduceCards && "rating-card_text-new_reduce"}`} >NEW!</p>}

      <p className={`rating-card__number 
      ${(pathname === '/rating-top' && (item.position === 1)) && "rating-card__number_first"} 
      ${(pathname === '/rating-top' && (item.position === 2)) && "rating-card__number_second"}
      ${(pathname === '/rating-top' && (item.position === 3)) && "rating-card__number_third"}
      `}>{item.position}</p>
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
    // </Link>
  );
}

export default RatingCard;