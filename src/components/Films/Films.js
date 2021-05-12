import React from 'react';
import FilmsItem from './FilmsItem';
import Preloader from '../Preloader/Preloader';
import FilmsContext from '../../contexts/FilmsContext';
import './Films.css';

function Films({
  onRemoveFilm,
  onOpenPopupAddCard,
  isUserAdmin,
  isLoading
}) {
  const films = React.useContext(FilmsContext);

  if (isLoading) {
    return <Preloader />
  }
  return (
    <div className="films">
      <h1 className="films__title">Коллекция фильмов</h1>
      <div className="films__container">
        {
          films
            .sort(() => Math.random() - 0.5)  //перемешиваем 
            .map(elem =>
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
