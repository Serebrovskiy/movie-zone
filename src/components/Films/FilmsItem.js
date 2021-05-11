import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './FilmsItem.css';

function FilmsItem({ item, onRemoveFilm, onOpenPopupAddCard, isUserAdmin }) {

  const { url } = useRouteMatch();

  return (
    <div className={`films-item ${!item.checked && "films-item_not-checked"}`}>
      {isUserAdmin &&
        <>
          <button className="films-item__button-remove" onClick={() => onRemoveFilm(item)} />
          <button className="films-item__button-edit" onClick={() => onOpenPopupAddCard(true, item)} />
        </>
      }
      <Link className="films-item__link" to={`${url}/${item.id}`}>
        <img className="films-item__image" src={item.link || "https://www.startfilm.ru/images/base/film/31_03_12/big_86561_15636.jpg"} alt="" />
        <div className="films-item__container">
          <h3 className="films-item__name">{item.name || "Премьера"}</h3>
          <p className="films-item__date">{item.date || "Неизвестно"} г.</p>
        </div>
      </Link>

    </div>
  );
}

export default FilmsItem;
