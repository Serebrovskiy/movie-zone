import React from 'react';
import './PremieresItem.css';
import { Link, useRouteMatch } from 'react-router-dom';

function PremieresItem({ item, onRemovePremier }) {

  const { url } = useRouteMatch();

  const handleRemoveClick = () => {
    onRemovePremier(item)
  }

  return (
    <div className="premieres-item">
      <button class="premieres-item__button-remove" onClick={handleRemoveClick} />
      <Link to={`${url}/${item.id}`} style={{ textDecoration: 'none' }}>
        <img className="premieres-item__image" src={item.link || "https://www.startfilm.ru/images/base/film/31_03_12/big_86561_15636.jpg"} alt="" />
        <h3 className="premieres-item__name">{item.name || "Премьера"}</h3>
        <p className="premieres-item__date">Дата выхода: {item.date || "1 января"}</p>
      </Link>

    </div>
  );
}

export default PremieresItem;
