import React from 'react';
import './AdminFilms.css';

function AdminFilms({ onOpenPopupAddCard, notCheckedFilms, onEditFilm }) {

  return (
    <div className="admin-films">
      <h1 className="admin-films__title">Управление данными коллекции</h1>

      <button className="admin-films__button-add" onClick={() => onOpenPopupAddCard(true)} >Добавить новый фильм</button>
      <div className="admin-films__cards-check">
        {notCheckedFilms.map(elem =>
          <button
            className="admin-films__card-button"
            type="button"
            key={elem.id}
            // @FIXME при ререндере эта штука пересоздастся. + Нужно вынести в хэлпер
            onClick={() => onOpenPopupAddCard(true, elem)}
          // onClick={() => onEditFilm(elem)}
          >{elem.name}
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminFilms;