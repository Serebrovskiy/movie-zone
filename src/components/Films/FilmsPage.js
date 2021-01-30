import React from 'react';
import './FilmsPage.css';
import { useParams, useHistory } from 'react-router-dom';

function FilmsPage({ films }) {

  let { id } = useParams();
  const history = useHistory();

  //грубая заглшка, films приходит пустой, то берем массив из localStorage
  films.length === 0 && (films = JSON.parse(localStorage.getItem('films')));
  const currentFilm = films.filter(elem => Number(id) === elem.id)[0];  //получаем актуальный фильм

  return (
    <div className="films-page">
      <button className="films-page__button-go-back" onClick={() => history.goBack()}>Назад</button>
      <img className="films-page__image" src={currentFilm.link} alt="" />
      <div className="films-page__container">
        <h3 className="films-page__name">{currentFilm.name}</h3>
        <ul className="films-page__list">
          <li className="films-page__about">
            <p className="films-page__text">Премьера:</p>
            <p className="films-page__text-data">{currentFilm.date} г.</p>
          </li>
          <li className="films-page__about">
            <p className="films-page__text">Жанр:</p>
            <div className="films-page__text-container">
              {currentFilm.genres.map((elem, index) => <p className="films-page__text-data" key={index}>{elem}</p>)}
            </div>
            {/* <p className="films-page__text-data">{currentFilm.genre}</p> */}
          </li>
          <li className="films-page__about">
            <p className="films-page__text">Страна:</p>
            <p className="films-page__text-data">{currentFilm.country}</p>
          </li>
          <li className="films-page__about">
            <p className="films-page__text">Режиссер:</p>
            <p className="films-page__text-data">{currentFilm.director}</p>
          </li>
          <li className="films-page__about">
            <p className="films-page__text">В ролях:</p>
            <div className="films-page__text-container">
              {currentFilm.actors.map((elem, index) => <p className="films-page__text-data" key={index}>{elem}</p>)}
            </div>
            {/* <p className="films-page__text-data">{currentFilm.actors.join(`, `)}</p> */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FilmsPage;
