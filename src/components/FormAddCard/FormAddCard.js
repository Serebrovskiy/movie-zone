import React, { useState, useRef, useEffect, useCallback } from 'react';
import './FormAddCard.css';

function FormAddCard({
  onClose,
  onAddFilm,
  onAddRatingCards,
  films,
  ratingCards,
  isAdmin,
  cardChecking,
  onEditFilm,
  onInfoTooltip
}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [position, setPosition] = useState('1');
  const [date, setDate] = useState('');
  const [genre1, setGenre1] = useState('');
  const [genre2, setGenre2] = useState('');
  const [country, setСountry] = useState('');
  const [director, setDirector] = useState('');
  const [actor1, setActor1] = useState('');
  const [actor2, setActor2] = useState('');
  const actors = [];
  const genres = [];

  const [isDisabled, setIsDisabled] = React.useState(true);
  const inputNameRef = useRef('');
  const inputLinkRef = useRef('');
  const inputDateRef = useRef('');


  //создаем массивы для жанров и актеров
  const handleActors = () => {   //  useCallback? 
    genre1 && genres.push(genre1)
    genre2 && genres.push(genre2)

    actor1 && actors.push(actor1)
    actor2 && actors.push(actor2)
  };

  function handleCheckValidity() {
    inputNameRef.current.checkValidity() && inputLinkRef.current.checkValidity() && inputDateRef.current.checkValidity()
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
      .toLocaleDateString('nu', {  //toLocaleString
        year: 'numeric',
        // month: 'long',
        // day: 'numeric'
      }) + ' г.'
    );
    handleCheckValidity();
  }

  function handleChangeInputGenre1(e) {
    setGenre1(e.target.value);
    handleCheckValidity();
  }

  function handleChangeInputGenre2(e) {
    setGenre2(e.target.value);
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

  function handleChangeInputActor1(e) {
    setActor1(e.target.value);
    handleCheckValidity();
  }
  function handleChangeInputActor2(e) {
    setActor2(e.target.value);
    handleCheckValidity();
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleActors();

    if (isAdmin) {
      //админ проверяет карточку
      if (cardChecking) {
        onEditFilm({
          name,
          link,
          date,
          genres,
          country,
          director,
          actors,
          checked: true,
          // id: Date.now(),  //?
        })
        onClose();

      } else {
        //админ добавляет карточку, если такой нет в базе
        if (films.some(elem => elem.name === name)) {
          onInfoTooltip('Такой фильм уже есть!')
        } else {
          onAddFilm({
            name,
            link,
            date,
            genres,
            country,
            director,
            actors,
            checked: true,
            id: Date.now(), //?
          });
          onClose();
        }
      }
    } else {
      //пользователь добавляет карточку, если такой нет в базе
      if (ratingCards.some(elem => elem.name === name) || films.some(elem => elem.name === name)) {
        onInfoTooltip('Такой фильм уже есть!')
      } else {
        onAddRatingCards({ name, date, link, position })
        console.log(actors)
        onAddFilm({
          name,
          link,
          date,
          genres,
          country,
          director,
          actors,
          checked: false,
          id: Date.now(), //?
        });
        onClose();
      }
    }
  }

  //очищаем форму
  useEffect(() => {
    setPosition('1');
    setName('');
    setLink('');
    setDate('');
    setGenre1('');
    setGenre2('');
    setСountry('');
    setDirector('');
    setActor1('');
    setActor2('');
  }, [onClose])

  //карточка идет на проверку
  useEffect(() => {
    if (cardChecking) {
      setName(cardChecking.name);
      setDate(cardChecking.date);
      setLink(cardChecking.link);
      setGenre1(cardChecking.genres[0]);
      genre2 && setGenre2(cardChecking.genres[1]);
      setСountry(cardChecking.country);
      setDirector(cardChecking.director);
      setActor1(cardChecking.actors[0]);
      actor2 && setActor2(cardChecking.actors[1]);
    }
  }, [cardChecking])

  return (
    <form
      className="formAddCard__form"
      onSubmit={handleSubmit}
    >
      <h2 className="formAddCard__title">Добавить новый фильм {!isAdmin && "в рейтинг"}</h2>
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
            maxLength="40"
            // autoComplete="off"
            pattern="^[а-яА-Я0-9.,!?+\s-]+$"
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
            // value={date}
            ref={inputDateRef}
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
            value={genre1}
            onChange={handleChangeInputGenre1}
            placeholder="фильм-катастрофа"
            required={isAdmin}
          />
          <span className="formAddCard__text">Жанр</span>
        </label>
        {
          (isAdmin && genre1) &&
          <label className="formAddCard__label">
            <input
              type="text"
              className="formAddCard__input"
              name="inputAdmin"
              value={genre2}
              onChange={handleChangeInputGenre2}
              placeholder="мелодрама"
            // required={isAdmin}
            />
            <span className="formAddCard__text">+</span>
          </label>
        }
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
            value={actor1}
            onChange={handleChangeInputActor1}
            placeholder="Леонардо Ди Каприо"
            required={isAdmin}
          />
          <span className="formAddCard__text">Актеры</span>
        </label>
        {
          (isAdmin && actor1) &&
          <label className="formAddCard__label">
            <input
              type="text"
              className="formAddCard__input"
              name="inputAdmin"
              value={actor2}
              onChange={handleChangeInputActor2}
              placeholder="Кейт Уинслет"
            // required={isAdmin}
            />
            <span className="formAddCard__text">+</span>
          </label>
        }

        {!cardChecking
          ?
          <button
            type="submit"
            className={`formAddCard__button ${isDisabled && "formAddCard__button_disabled"}`}
            disabled={isDisabled}
          >
            Добавить
          </button>
          :
          <div className="formAddCard__button-container">
            <button
              type="submit"
              className={`formAddCard__button formAddCard__button-accept ${isDisabled && "formAddCard__button_disabled"}`}
              disabled={isDisabled}
            >
              Принять
            </button>
            <button
              type="button"
              className="formAddCard__button formAddCard__button-remove"  //сделать модификатор
              // disabled={isDisabled}
              onClick={() => onEditFilm(cardChecking, true)}
            >
              Отклонить
        </button>
          </div>
        }
      </div>
    </form>

  );
}

export default FormAddCard; 