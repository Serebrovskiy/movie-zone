import React, { useState } from 'react';
import './PopupAddCard.css';
import FormAddCard from '../FormAddCard/FormAddCard'
import SearchAddCard from '../SearchAddCard/SearchAddCard'

function PopupAddCard({
  isOpen,
  onClose,
  onAddRatingCards,
  films,
  ratingCards
}) {
  const [numberSection, setNumberSection] = useState(0);

  function handleChangeSection(e) {
    setNumberSection(Number(e.target.value));
  }

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
        <div className="popupAddCard__container-for-section">
          <input
            className="popupAddCard__section"
            type="radio"
            name="section"
            id="addNew"
            value={0}
            onChange={handleChangeSection}
            checked={!numberSection}
          />
          <input
            className="popupAddCard__section"
            type="radio"
            name="section"
            id="addFromCollections"
            value={1}
            onChange={handleChangeSection}
          />
        </div>
        {
          numberSection
            ?
            <SearchAddCard
              onClose={onClose}
              onAddRatingCards={onAddRatingCards}
              films={films}
              ratingCards={ratingCards}
            />
            :
            <FormAddCard
              onClose={onClose}
              onAddRatingCards={onAddRatingCards}
              ratingCards={ratingCards}
            />
        }
      </div>
    </div>
  );
}

export default PopupAddCard; 