import React from 'react';
import './Films.css';
import FilmsItem from './FilmsItem';
import Preloader from '../Preloader/Preloader';


function Films({
  films,
  onRemoveFilm,
  onOpenPopupAddCard,
  isUserAdmin,
  isLoading
}) {
  return (
    <div className="films">
      <h1 className="films__title">Коллекция фильмов</h1>
      <div className="films__container">
        {isLoading && <Preloader />}
        {
          films.map(elem =>
            <FilmsItem
              item={elem}
              key={elem.id}
              onRemoveFilm={onRemoveFilm}
              onOpenPopupAddCard={onOpenPopupAddCard}
              isUserAdmin={isUserAdmin}
            />
          )
        }
      </div>
    </div>
  );
}

export default Films;
