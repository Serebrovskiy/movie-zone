import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './FilmsItem.css';

// function FilmsItem({ item, onRemoveFilm, onOpenPopupAddCard, isUserAdmin }) {
function FilmsItem(props) {

  const { url } = useRouteMatch();

  return (
    <div className={`films-item ${!props.item.checked && "films-item_not-checked"}`}>
      {props.isUserAdmin &&
        <>
          <button className="films-item__button-remove" onClick={() => props.onRemoveFilm(props.item)} />
          <button className="films-item__button-edit" onClick={() => props.onOpenPopupAddCard(true, props.item)} />
        </>
      }
      <Link className="films-item__link" to={`${url}/${props.item.id}`}>
        <img className="films-item__image" src={props.item.link || "https://www.startfilm.ru/images/base/film/31_03_12/big_86561_15636.jpg"} alt="" />
        <div className="films-item__container">
          <h3 className="films-item__name">{props.item.name || "Премьера"}</h3>
          <p className="films-item__date">{props.item.date || "Неизвестно"} г.</p>
        </div>
      </Link>

    </div>
  );
}

export default FilmsItem;
