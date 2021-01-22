import React, { useState, useRef } from 'react';
import './FormAddCard.css';

function FormAddCard({
  onClose,
  onAddRatingCards,
  ratingCards
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

    if (ratingCards.some(elem => elem.name === name)) {
      alert('Такой фильм уже есть!')
    } else {
      onAddRatingCards({ name, link, position })
      setName('');
      setLink('');
      setPosition('1');
      onClose();
    }
  }

  return (
    <form
      className="formAddCard__form"
      onSubmit={handleSubmit}
    >
      <h2 className="formAddCard__title">Добавить новый фильм в рейтинг</h2>
      <div className="formAddCard__container">
        <label className="formAddCard__label">
          <input
            className="formAddCard__input"
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
          <span className="formAddCard__text">Название</span>
        </label>
        <label className="formAddCard__label">
          <input
            className="formAddCard__input"
            type="url"
            name="inputPoster"
            value={link}
            ref={inputLinkRef}
            onChange={handleLink}
            placeholder="Постер"
          />
          <span className="formAddCard__text">Ссылка на постер</span>
        </label>
        <label className="formAddCard__label">
          <input
            className="formAddCard__input"
            type="number"
            name="inputPosition"
            value={position}
            onChange={handlePosition}
            placeholder="Позиция"
            min='1'
            max={ratingCards.length + 1}
            required
          />
          <span className="formAddCard__text">Позиция</span>
        </label>
        <button
          type="submit"
          className={`formAddCard__button ${isDisabled && "formAddCard__button_disabled"}`}
          disabled={isDisabled}
        >
          Добавить
            </button>
      </div>
    </form>

  );
}

export default FormAddCard; 