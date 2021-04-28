import React, { useState, useRef, useEffect } from 'react';
import './FormAddCard.css';

/* @FIXME Компонент, больший чем 80-120 строк - невозможно читать
*  чтобы такого не было можно:
*  - инакапсулировать логику в другом месте + привязать ее к моделе. Компонент должен просто получать данные на отрисовку
*  - подходить к верстке компонентно и бить большие компоненты на более маленькие части.
* Главная задача при разработке компоненты - сделать ее максимально понятной и читаемой для других разработчиков
* */

function FormAddCard({
  onClose,
  onAddFilm,
  onAddRatingCards,
  films,
  ratingCards,
  isAdmin,
  cardChecking,
  onEditFilm,
  onInfoTooltip,
  pathname
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
  const [isShowInputs, setIsShowInputs] = useState(false);

  const [isDisabled, setIsDisabled] = React.useState(true);
  const inputNameRef = useRef('');
  const inputLinkRef = useRef('');
  const inputDateRef = useRef('');

  let [count, setCount] = useState(0);


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
    // setDate(new Date(e.target.value)
    //   .toLocaleDateString('nu', {  //toLocaleString
    //     year: 'numeric',
    //     // month: 'long',
    //     // day: 'numeric'
    //   }) + ' г.'
    // );
    setDate(e.target.value);
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
    // handleCheckValidity();
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
    // handleCheckValidity();
  }

  //выводим или убираем инпуты
  function handleShowInputs() {
    setIsShowInputs(!isShowInputs)
    if (!isShowInputs) {
      let timerId = setInterval(() => setCount(count++), 100); //реализуем пошаговое появление
      setTimeout(() => { clearInterval(timerId); }, 1000); //очищаем через 1 сек
    } else {
      setCount(0)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleActors();

    //админ
    if (isAdmin) {
      //админ проверяет карточку
      if (cardChecking) {
        onEditFilm({
          name,
          date,
          link,
          genres,
          country,
          director,
          actors,
          checked: true,
          totalRange: cardChecking.totalRange,
          id: cardChecking.id //: Date.now(),  //?
        })
        onClose();
      } else {
        //админ добавляет карточку, если такой нет в базе
        if (films.some(elem => elem.name === name)) {
          onInfoTooltip('Такой фильм уже есть!')
        } else {
          onAddFilm({
            name,
            date,
            link,
            genres,
            country,
            director,
            actors,
            checked: true,
            totalRange: 0,
            id: Date.now(), //?
          });
          onClose();
        }
      }
      //пользователь
    } else {
      //пользователь добавляет карточку, если такой нет в базе
      if (ratingCards.some(elem => elem.name === name) || films.some(elem => elem.name === name)) {
        onInfoTooltip('Такой фильм уже есть!')
      } else {
        onAddRatingCards({
          name,
          date,
          link,
          position,
          genres,
          country,
          director,
          actors,
          checked: false,
          id: Date.now(), //?
        })
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
    // console.log(genre1)
    // console.log(cardChecking)
    if (cardChecking) {
      setName(cardChecking.name);
      setDate(cardChecking.date);
      setLink(cardChecking.link);
      // setGenre1(genres.length !== 0 ? cardChecking.genres[0] : '');
      cardChecking.genres[0] && setGenre1(cardChecking.genres[0]);
      cardChecking.genres[1] && setGenre2(cardChecking.genres[1]);
      // setGenre2(cardChecking.genres[1]);
      setСountry(cardChecking.country);
      setDirector(cardChecking.director);
      cardChecking.actors[0] && setActor1(cardChecking.actors[0]);
      cardChecking.actors[1] && setActor2(cardChecking.actors[1]);
      // setActor2(cardChecking.actors[1]);
    }
  }, [cardChecking])


  return (
    <form
      // определяем размеры формы
      className={`formAddCard__form ${(!isShowInputs) && "formAddCard__form_hidden"} 
    ${(pathname === "/admin-films") && "formAddCard__form_admin"}`}
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
            // type="date"
            type="text"
            className="formAddCard__input"
            name="date"
            value={date}
            ref={inputDateRef}
            onChange={handleChangeInputDate}
            minLength="4"
            maxLength="4"
            placeholder="2000"
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
              max={ratingCards && ratingCards.length + 1}
              step="1"
              required
            />
            <span className="formAddCard__text">{position} - Позиция</span>
            {!isAdmin && <span className="formAddCard__required">*</span>}
          </label>
        }
        {/* ${(!isAdmin && !isShowInputs)} */}
        <label className={`formAddCard__label  ${(!isAdmin && count < 1) && "formAddCard__label_hidden"}`}>
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

        <label className={`formAddCard__label ${(!isAdmin && count < 2) && "formAddCard__label_hidden"}`}>
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
        <label className={`formAddCard__label ${(!isAdmin && count < 3) && "formAddCard__label_hidden"}`}>
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
        <label className={`formAddCard__label ${(!isAdmin && count < 4) && "formAddCard__label_hidden"}`}>
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
        <label className={`formAddCard__label ${(!isAdmin && count < 5) && "formAddCard__label_hidden"}`}>
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
        {/* {() => handleShowInputs()} */}

        {!isAdmin &&
          <button
            type="button"
            className={`formAddCard__button-show-inputs ${"formAddCard__button-show-inputs_off"}`}
            onClick={handleShowInputs}
          >
            {isShowInputs ? "Скрыть параметры" : "Дополнительные параметры"}
          </button>
        }
        {
          ((pathname === "/admin-films" || pathname === "/rating") && !cardChecking) &&
          <button
            type="submit"
            className={`formAddCard__button ${isDisabled && "formAddCard__button_disabled"}`}
            disabled={isDisabled}
          >
            Добавить
          </button>
        }
        {
          (pathname === "/admin-films" && cardChecking) &&
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
        {
          (pathname === "/films" && cardChecking) &&
          <div className="formAddCard__button-container">
            <button
              type="submit"
              className={`formAddCard__button formAddCard__button-accept ${isDisabled && "formAddCard__button_disabled"}`}
              disabled={isDisabled}
            >
              Обновить
            </button>
          </div>
        }
      </div>
    </form>

  );
}

export default FormAddCard; 