import React, { useState, useRef, useEffect } from 'react';
import './FormAddCard.css';

function FormAddCard({
  onClose,
  onAddFilm,
  onAddRatingCards,
  films,
  ratingCards,
  isAdmin,
  cardChecking,
  onEditFilm
}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [position, setPosition] = useState('1');
  const [date, setDate] = useState('');
  const [genre, setGenre] = useState('');
  const [country, setСountry] = useState('');
  const [director, setDirector] = useState('');
  const [cast, setСast] = useState('');
  // const [checked, setСhecked] = useState(false);

  const [isDisabled, setIsDisabled] = React.useState(true);
  const inputNameRef = useRef('');
  const inputLinkRef = useRef('');


  function handleCheckValidity() {
    inputNameRef.current.checkValidity() && inputLinkRef.current.checkValidity() && inputNameRef
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

  function handleChangeInputDate(e) {
    setDate(new Date(e.target.value)
      .toLocaleString('nu', {
        year: 'numeric',
        // month: 'long',
        // day: 'numeric'
      }) + ' г.'
    );
    handleCheckValidity();
  }

  function handleChangeInputGenre(e) {
    setGenre(e.target.value);
    handleCheckValidity();
  }

  function handleChangeInputCountry(e) {
    setСountry(e.target.value);
    handleCheckValidity();
  }

  function handleChangeInputDirector(e) {
    setDirector(e.target.value);
    handleCheckValidity();
  }

  function handleChangeInputCast(e) {
    setСast(e.target.value);
    handleCheckValidity();
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isAdmin) {
      if (cardChecking) {
        onEditFilm({
          name,
          link,
          date,
          genre,
          country,
          director,
          cast,
          checked: true,
          id: Date.now(),
        })
        onClose();

      } else {
        if (films.some(elem => elem.name === name)) {
          alert('Такой фильм уже есть!')
        } else {
          onAddFilm({
            name,
            link,
            date,
            genre,
            country,
            director,
            cast,
            checked: true,
            id: Date.now(),
          });

          setName('');
          setLink('');
          setDate('');
          setGenre('');
          setСountry('');
          setDirector('');
          setСast('');
          onClose();
        }
      }
    } else {
      // тут нужно подумать, если такой фильм есть в коллекции, то нужно предложить его просто добавить, короче разделять инфо-попапом где произошло совпадение
      if (ratingCards.some(elem => elem.name === name) || films.some(elem => elem.name === name)) {
        alert('Такой фильм уже есть!')
      } else {
        onAddRatingCards({ name, link, position })
        onAddFilm({
          name,
          link,
          date,
          genre,
          country,
          director,
          cast,
          checked: false,
          id: Date.now(),
        });
        setPosition('1');
        setName('');
        setLink('');
        setDate('');
        setGenre('');
        setСountry('');
        setDirector('');
        setСast('');
        onClose();
      }
    }
  }

  useEffect(() => {
    console.log(cardChecking)
    if (cardChecking) {
      setName(cardChecking.name);
      setDate(cardChecking.date);
      setLink(cardChecking.link);
      setGenre(cardChecking.genre);
      setСountry(cardChecking.country);
      setDirector(cardChecking.director);
      setСast(cardChecking.cast);
    }
  }, [cardChecking])

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
          {!isAdmin && <span className="formAddCard__required">*</span>}
        </label>
        <label className="formAddCard__label">
          <input
            type="date"
            className="formAddCard__input"
            name="date"
            // ref={inputDateRef}
            onChange={handleChangeInputDate}
            placeholder=""
            required
          />
          <span className="formAddCard__text">Год премьеры</span>
          {!isAdmin && <span className="formAddCard__required">*</span>}
        </label>
        {!isAdmin &&
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
              step="1"
              required
            />
            <span className="formAddCard__text">{position} - Позиция</span>
            {!isAdmin && <span className="formAddCard__required">*</span>}
          </label>
        }
        <label className="formAddCard__label">
          <input
            className="formAddCard__input"
            type="url"
            name="inputPoster"
            value={link}
            ref={inputLinkRef}
            onChange={handleLink}
            placeholder="Постер"
            required={isAdmin}
          />
          <span className="formAddCard__text">Ссылка на постер</span>
        </label>

        <label className="formAddCard__label">
          <input
            type="text"
            className="formAddCard__input"
            name="inputAdmin"
            value={genre}
            onChange={handleChangeInputGenre}
            placeholder="фильм-катастрофа, мелодрама"
            required={isAdmin}
          />
          <span className="formAddCard__text">Жанр</span>
        </label>
        <label className="formAddCard__label">
          <input
            type="text"
            className="formAddCard__input"
            name="inputAdmin"
            value={country}
            onChange={handleChangeInputCountry}
            placeholder="США"
            required={isAdmin}
          />
          <span className="formAddCard__text">Страна</span>
        </label>
        <label className="formAddCard__label">
          <input
            type="text"
            className="formAddCard__input"
            name="inputAdmin"
            value={director}
            onChange={handleChangeInputDirector}
            placeholder="Джеймс Кэмерон"
            required={isAdmin}
          />
          <span className="formAddCard__text">Режиссер</span>
        </label>
        <label className="formAddCard__label">
          <input
            type="text"
            className="formAddCard__input"
            name="inputAdmin"
            value={cast}
            onChange={handleChangeInputCast}
            placeholder="Леонардо Ди Каприо, Кейт Уинслет"
            required={isAdmin}
          />
          <span className="formAddCard__text">Актеры</span>
        </label>

        <button
          type="submit"
          className={`formAddCard__button ${isDisabled && "formAddCard__button_disabled"}`}
          disabled={isDisabled}
        >
          {cardChecking ? 'Обновить' : 'Добавить'}
        </button>
        {cardChecking &&
          <button
            type="button"
            className="formAddCard__button formAddCard__button-remove"  //сделать модификатор
            // disabled={isDisabled}
            onClick={() => onEditFilm(cardChecking, true)}
          >
            Отклонить
        </button>
        }
      </div>
    </form>

  );
}

export default FormAddCard; 