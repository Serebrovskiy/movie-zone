import React from 'react';
import './FilmsPage.css';
import { useParams, useHistory } from 'react-router-dom';
import * as api from '../../utils/Api';

function FilmsPage({ films, handleGetFilms }) {

  let { id } = useParams();
  const history = useHistory();

  let currentFilm;

  if (films.length !== 0) {
    currentFilm = films.filter(elem => id === elem.id)[0];  //получаем актуальный фильм   Number(id)
  }
  //как то не очень работает
  // else {
  //   showFilms()
  //     .then(res => {
  //       currentFilm = res.filter(elem => id === elem._id)[0];
  //     })
  // }
  // async function showFilms() {
  //   let response = await api.getFilms()
  //   return response;
  // }

  //грубая заглшка, films приходит пустой, то берем массив из localStorage
  //films.length === 0 && (films = JSON.parse(localStorage.getItem('films')));

  return (
    <div className="films-page">
      <button className="films-page__button-go-back" onClick={() => history.goBack()}>Назад</button>
      <img className="films-page__image" src={currentFilm && currentFilm.link} alt="" />
      <div className="films-page__container">
        <h3 className="films-page__name">{currentFilm && currentFilm.name}</h3>
        <ul className="films-page__list">
          <li className="films-page__about">
            <p className="films-page__text">Премьера:</p>
            <p className="films-page__text-data">{currentFilm && currentFilm.date} г.</p>
          </li>
          <li className="films-page__about">
            <p className="films-page__text">Жанр:</p>
            <div className="films-page__text-container">
              {currentFilm && currentFilm.genres.map((elem, index) => <p className="films-page__text-data" key={index}>{elem}</p>)}
            </div>
            {/*old <p className="films-page__text-data">{currentFilm.genre}</p> */}
          </li>
          <li className="films-page__about">
            <p className="films-page__text">Страна:</p>
            <p className="films-page__text-data">{currentFilm && currentFilm.country}</p>
          </li>
          <li className="films-page__about">
            <p className="films-page__text">Режиссер:</p>
            <p className="films-page__text-data">{currentFilm && currentFilm.director}</p>
          </li>
          <li className="films-page__about">
            <p className="films-page__text">В ролях:</p>
            <div className="films-page__text-container">
              {currentFilm && currentFilm.actors.map((elem, index) => <p className="films-page__text-data" key={index}>{elem}</p>)}
            </div>
            {/*old <p className="films-page__text-data">{currentFilm.actors.join(`, `)}</p> */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FilmsPage;
