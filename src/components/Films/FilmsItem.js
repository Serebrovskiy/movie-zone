import React from 'react';
import './FilmsItem.css';
import { Link, useRouteMatch } from 'react-router-dom';

function FilmsItem({ item, onRemoveFilm }) {

  const { url } = useRouteMatch();

  const handleRemoveClick = () => {
    onRemoveFilm(item)
  }

  return (
    <div className="films-item">
      <button className="films-item__button-remove" onClick={handleRemoveClick} />
      <Link to={`${url}/${item.id}`} style={{ textDecoration: 'none' }}>
        <img className="films-item__image" src={item.link || "https://www.startfilm.ru/images/base/film/31_03_12/big_86561_15636.jpg"} alt="" />
        <h3 className="films-item__name">{item.name || "Премьера"}</h3>
        <p className="films-item__date">{item.date || "Неизвестно"}</p>
      </Link>

    </div>
  );
}

export default FilmsItem;
