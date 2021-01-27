import React from 'react';
import './PopupAddCard.css';
import FormAddCard from '../FormAddCard/FormAddCard'
import SearchAddCard from '../SearchAddCard/SearchAddCard'

function PopupAddCard({
  isOpen,
  onClose,
  onAddFilm,
  onAddRatingCards,
  films,
  ratingCards,
  isAdmin,
  cardChecking,
  onEditFilm,
  onInfoTooltip,
  onChangeSection,
  numberSection
}) {

  return (
    <div className={`popupAddCard ${isOpen && "popupAddCard_opened"}`}>
      <div
        className="popupAddCard__form"
      // onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="popupAddCard__button-close"
          onClick={onClose}
        />
        {!isAdmin &&
          <div className="popupAddCard__container-for-section">
            <input
              className="popupAddCard__section"
              type="radio"
              name="section"
              id="addNew"
              value={0}
              onChange={() => onChangeSection(0)}
              checked={!numberSection}
            />
            <label className="popupAddCard__section-label" for="addNew">Добавить новый фильм</label>
            <input
              className="popupAddCard__section"
              type="radio"
              name="section"
              id="addFromCollections"
              value={1}
              onChange={() => onChangeSection(1)}
              checked={numberSection}
            />
            <label className="popupAddCard__section-label" for="addFromCollections">Добавить из коллекции</label>
          </div>
        }
        {
          (numberSection && !isAdmin)
            ?
            <SearchAddCard
              onClose={onClose}
              onAddRatingCards={onAddRatingCards}
              films={films}
              ratingCards={ratingCards}
              onInfoTooltip={onInfoTooltip}
            />
            :
            <FormAddCard
              onClose={onClose}
              onAddFilm={onAddFilm}
              onAddRatingCards={onAddRatingCards}
              films={films}
              ratingCards={ratingCards}
              isAdmin={isAdmin}
              cardChecking={cardChecking}
              onEditFilm={onEditFilm}
              onInfoTooltip={onInfoTooltip}
            />
        }
      </div>
    </div>
  );
}

export default PopupAddCard; 