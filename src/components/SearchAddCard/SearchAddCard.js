import React, { useState } from 'react';
import './SearchAddCard.css';
// import FilmsItem from '../Films/FilmsItem'

function SearchAddCard({
  onClose,
  onAddRatingCards,
  films,
  ratingCards
}) {

  const [name, setName] = useState('');
  const [valueRes, setValueRes] = React.useState([]);
  const [position, setPosition] = useState('1');
  const [hoverCard, setHoverCard] = useState(false);

  function handleChangeInput(e) {
    setName(e.target.value);
    setValueRes(
      films.filter(elem =>
        // (e.target.value.length > 1) && //выводим результат начиная с 2ой буквы
        elem.name.toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    )
    !e.target.value && setValueRes([])
  }

  function handlePosition(e) {
    setPosition(e.target.value);
  }

  function enterResultName(elem) {
    setHoverCard(
      <div className="searchAddCard__hover-card">
        <img className="searchAddCard__hover-card-image" src={elem.link} alt={elem.name} />
        <p className="searchAddCard__hover-card-name">{elem.name}</p>
        <p className="searchAddCard__hover-card-date">{elem.date}</p>
      </div>
    );
  }

  function leaveResultName() {
    setHoverCard(false);
  }

  function handleSubmit(elem, e) {
    e.preventDefault();

    const name = elem.name;
    const link = elem.link;

    if (ratingCards.some(elm => elm.name === name)) {
      alert('Такой фильм уже есть!')
    } else {
      onAddRatingCards({ name, link, position })
      setName('');
      setPosition('1');
      setValueRes([]);
      setHoverCard(false);
      onClose();
    }
  }

  return (
    <form
      className="searchAddCard__form"
      onSubmit={handleSubmit}
    >
      <h2 className="searchAddCard__title">Добавить фильм из коллекции</h2>
      <div className="searchAddCard__container">
        <label className="searchAddCard__label">
          <input
            className="searchAddCard__input"
            type="text"
            name="inputName"
            value={name}
            onChange={handleChangeInput}
            placeholder="Поиск"
            minLength="2"
            maxLength="30"
            autoComplete="off"
            required
          />
          <span className="searchAddCard__text">Поиск</span>
        </label>
        <label className="formAddCard__label">
          <input
            className="formAddCard__input-range"
            type="range"
            name="inputPosition"
            value={position}
            onChange={handlePosition}
            placeholder="Позиция"
            min='1'
            max={ratingCards.length + 1}
            required

            step="1"
          />
          <span className="formAddCard__text">{position} - Позиция</span>
        </label>

        <div className="searchAddCard__result-container">
          <div className="searchAddCard__result-list">
            {
              valueRes.map(elem =>
                <button
                  type="submit"
                  className="searchAddCard__result-item"
                  onClick={(e) => handleSubmit(elem, e)}
                  onPointerEnter={() => enterResultName(elem)}
                  onPointerLeave={() => leaveResultName(elem)}
                  key={elem.id}
                >
                  {elem.name}
                </button>
              )
            }
          </div>
          {hoverCard}
        </div>
      </div>
    </form>

  );
}

export default SearchAddCard; 