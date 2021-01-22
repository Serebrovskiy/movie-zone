import React from 'react';
import './FilmsPage.css';
import { useParams, useHistory } from 'react-router-dom';

function FilmsPage({ data, films }) {

  let { id } = useParams();
  const history = useHistory();
  // console.log(id)
  // console.log(films[id])

  return (
    <div className="films-page">
      <button className="films-page__button-go-back" onClick={() => history.goBack()}>Назад</button>
      <img className="films-page__image" src={films[id].link} alt="" />
      <div className="films-page__container">
        <h3 className="films-page__name">{films[id].name}</h3>
        <ul className="films-page__list">
          <li className="films-page__about">
            <p className="films-page__text">Премьера:</p>
            <p className="films-page__text-data">{films[id].date}</p>
          </li>
          <li className="films-page__about">
            <p className="films-page__text">Жанр:</p>
            <p className="films-page__text-data">{films[id].genre}</p>
          </li>
          <li className="films-page__about">
            <p className="films-page__text">Страна:</p>
            <p className="films-page__text-data">{films[id].country}</p>
          </li>
          <li className="films-page__about">
            <p className="films-page__text">Режиссер:</p>
            <p className="films-page__text-data">{films[id].director}</p>
          </li>
          <li className="films-page__about">
            <p className="films-page__text">В ролях:</p>
            <p className="films-page__text-data">{films[id].cast}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FilmsPage;
