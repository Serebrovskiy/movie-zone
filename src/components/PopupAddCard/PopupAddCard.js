import React from 'react';
import FormAddCard from '../FormAddCard/FormAddCard'
import SearchAddCard from '../SearchAddCard/SearchAddCard'
import './PopupAddCard.css';

function PopupAddCard({
  isOpen,
  onClose,
  onAddFilm,
  onAddRatingCards,
  isAdmin,
  cardChecking,
  onEditFilm,
  onInfoTooltip,
  onChangeSection,
  numberSection,
  pathname
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
        {
          (pathname === "/rating") &&  //!isAdmin &&
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
            <label className="popupAddCard__section-label" htmlFor="addNew">Добавить новый</label>
            <input
              className="popupAddCard__section"
              type="radio"
              name="section"
              id="addFromCollections"
              value={1}
              onChange={() => onChangeSection(1)}
              checked={numberSection}
            />
            <label className="popupAddCard__section-label" htmlFor="addFromCollections">Добавить из коллекции</label>
          </div>
        }
        {
          (numberSection && !isAdmin)
            ?
            <SearchAddCard
              onClose={onClose}
              onAddRatingCards={onAddRatingCards}
              onInfoTooltip={onInfoTooltip}
            />
            :
            <FormAddCard
              onClose={onClose}
              onAddFilm={onAddFilm}
              onAddRatingCards={onAddRatingCards}
              isAdmin={isAdmin}
              cardChecking={cardChecking}
              onEditFilm={onEditFilm}
              onInfoTooltip={onInfoTooltip}
              pathname={pathname}
            />
        }
      </div>
    </div>
  );
}

export default PopupAddCard; 