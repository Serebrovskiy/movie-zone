import React, { useState } from 'react';
import './PopupAddCard.css';

function PopupAddCard({
  isOpen,
  onClose,
  onAddRatingFilms
}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [position, setPosition] = useState('1');

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handlePosition(e) {
    setPosition(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddRatingFilms({ name, link, position })
    setName('');
    setLink('');
    setPosition('1');
  }


  return (
    <div className={`popupAddCard ${isOpen && "popupAddCard_opened"}`}>
      <form
        className="popupAddCard__form"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="popupAddCard__button-close"
          onClick={onClose}
        />
        <h2 className="popupAddCard__title">Добавление фильма в рейтинг</h2>
        <div className="popupAddCard__container">
          <label className="popupAddCard__label">
            <input
              className="popupAddCard__input"
              type="text"
              name="inputName"
              value={name}
              onChange={handleName}
              placeholder="Название"
              required
            />
            <span className="popupAddCard__text">Название</span>
          </label>
          <label className="popupAddCard__label">
            <input
              className="popupAddCard__input"
              type="text"
              name="inputPoster"
              value={link}
              onChange={handleLink}
              placeholder="Постер"
            />
            <span className="popupAddCard__text">Ссылка на постер</span>
          </label>
          <label className="popupAddCard__label">
            <input
              className="popupAddCard__input"
              type="number"
              name="inputPosition"
              value={position}
              onChange={handlePosition}
              placeholder="Позиция"
              required
            />
            <span className="popupAddCard__text">Позиция</span>
          </label>
          <button
            type="submit"
            className={`popupAddCard__button`}// ${isDisabled && "popup__button_disabled"}`}
            // disabled={isDisabled}
            onClick={onClose}
          >
            Добавить
            </button>
        </div>
      </form>
    </div>
  );
}

export default PopupAddCard; 