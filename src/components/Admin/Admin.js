import React, { useState } from 'react';
import './Admin.css';

function Admin({ onAddFilm }) {
  const [name, setName] = useState('');
  const [linkImage, setLinkImage] = useState('');
  const [date, setDate] = useState('');
  const [genre, setGenre] = useState('');
  const [country, setСountry] = useState('');
  const [director, setDirector] = useState('');
  const [cast, setСast] = useState('');


  function handleChangeInputName(e) {
    setName(e.target.value);
  }

  function handleChangeInputLinkImage(e) {
    setLinkImage(e.target.value);
  }

  function handleChangeInputDate(e) {
    setDate(new Date(e.target.value)
      .toLocaleString('nu', {
        year: 'numeric',
        // month: 'long',
        // day: 'numeric'
      }) + ' г.'
    );
  }

  function handleChangeInputGenre(e) {
    setGenre(e.target.value);
  }

  function handleChangeInputCountry(e) {
    setСountry(e.target.value);
  }

  function handleChangeInputDirector(e) {
    setDirector(e.target.value);
  }

  function handleChangeInputCast(e) {
    setСast(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddFilm({
      name,
      link: linkImage,
      date,
      genre,
      country,
      director,
      cast,
      id: Date.now(),
    });

    setName('');
    setLinkImage('');
    setDate('');
    setGenre('');
    setСountry('');
    setDirector('');
    setСast('');
  }

  return (
    <div className="admin">
      <h1 className="admin__title">Управление данными</h1>
      <form onSubmit={handleSubmit}>

        <div className="admin__container">
          <h3 className="admin__subtitle">Добавить премьеру</h3>
          <label className="admin__label">
            <input
              type="text"
              className="admin__input"
              name="inputName"
              value={name}
              onChange={handleChangeInputName}
              placeholder="Титаник"
              required
            />
            <span className="admin__text">Название</span>
          </label>
          <label className="admin__label">
            <input
              type="text"
              className="admin__input"
              name="inputAdmin"
              value={linkImage}
              onChange={handleChangeInputLinkImage}
              placeholder="https://www.startfilm.ru/images/base/film/31_03_12/big_86561_15636.jpg"
              required
            />
            <span className="admin__text">Ссылка на картинку</span>
          </label>
          <label className="admin__label">
            <input
              type="date"
              className="admin__input"
              name="date"
              // value={date}
              onChange={handleChangeInputDate}
              placeholder=""
              required
            />
            <span className="admin__text">Дата премьеры</span>
          </label>

          <label className="admin__label">
            <input
              type="text"
              className="admin__input"
              name="inputAdmin"
              value={genre}
              onChange={handleChangeInputGenre}
              placeholder="фильм-катастрофа, мелодрама"
            />
            <span className="admin__text">Жанр</span>
          </label>
          <label className="admin__label">
            <input
              type="text"
              className="admin__input"
              name="inputAdmin"
              value={country}
              onChange={handleChangeInputCountry}
              placeholder="США"
            />
            <span className="admin__text">Страна</span>
          </label>
          <label className="admin__label">
            <input
              type="text"
              className="admin__input"
              name="inputAdmin"
              value={director}
              onChange={handleChangeInputDirector}
              placeholder="Джеймс Кэмерон"
            />
            <span className="admin__text">Режиссер</span>
          </label>
          <label className="admin__label">
            <input
              type="text"
              className="admin__input"
              name="inputAdmin"
              value={cast}
              onChange={handleChangeInputCast}
              placeholder="Леонардо Ди Каприо, Кейт Уинслет"
            />
            <span className="admin__text">Актеры</span>
          </label>
          <button type="submit" className="admin__button" onClick={handleSubmit}>Добавить</button>
        </div>

      </form>
    </div>
  );
}

export default Admin;
