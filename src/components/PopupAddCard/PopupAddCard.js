import React, { useState, useRef } from 'react';
import './PopupAddCard.css';

function PopupAddCard({
  isOpen,
  onClose,
  onAddRatingFilms,
  ratingFilms
}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [position, setPosition] = useState('1');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const inputNameRef = useRef('');
  const inputLinkRef = useRef('');

  function handleCheckValidity() {
    inputNameRef.current.checkValidity() && inputLinkRef.current.checkValidity()
      ?
      setIsDisabled(false) : setIsDisabled(true);
  }

  function handleName(e) {
    setName(e.target.value);
    handleCheckValidity();
  }

  function handleLink(e) {
    setLink(e.target.value);
    handleCheckValidity();
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
    onClose();
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
              ref={inputNameRef}
              onChange={handleName}
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popupAddCard__text">Название</span>
          </label>
          <label className="popupAddCard__label">
            <input
              className="popupAddCard__input"
              type="url"
              name="inputPoster"
              value={link}
              ref={inputLinkRef}
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
              min='1'
              max={ratingFilms.length + 1}
              required
            />
            <span className="popupAddCard__text">Позиция</span>
          </label>
          <button
            type="submit"
            className={`popupAddCard__button ${isDisabled && "popupAddCard__button_disabled"}`}
            disabled={isDisabled}
          >
            Добавить
            </button>
        </div>
      </form>
    </div>
  );
}

export default PopupAddCard; 