import React from 'react';
import './PremieresItemPage.css';
import { useParams, useHistory } from 'react-router-dom';

function PremieresItemPage({ data }) {

  let { id } = useParams();
  const history = useHistory();

  return (
    <div className="premieres-item-page">
      <button className="premieres-item-page__button-go-back" onClick={() => history.goBack()}>Назад</button>
      <img className="premieres-item-page__image" src={data[id].link} alt="" />
      <div className="premieres-item-page__container">
        <h3 className="premieres-item-page__name">{data[id].name}</h3>
        <ul className="premieres-item-page__list">
          <li className="premieres-item-page__about">
            <p className="premieres-item-page__text">Дата выхода:</p>
            <p className="premieres-item-page__text-data">{data[id].date}</p>
          </li>
          <li className="premieres-item-page__about">
            <p className="premieres-item-page__text">Жанр:</p>
            <p className="premieres-item-page__text-data">{data[id].genre}</p>
          </li>
          <li className="premieres-item-page__about">
            <p className="premieres-item-page__text">Страна:</p>
            <p className="premieres-item-page__text-data">{data[id].country}</p>
          </li>
          <li className="premieres-item-page__about">
            <p className="premieres-item-page__text">Режиссер:</p>
            <p className="premieres-item-page__text-data">{data[id].director}</p>
          </li>
          <li className="premieres-item-page__about">
            <p className="premieres-item-page__text">В ролях:</p>
            <p className="premieres-item-page__text-data">{data[id].cast}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PremieresItemPage;
