import React from 'react';
import FilmsItem from './FilmsItem';
import Preloader from '../Preloader/Preloader';
import FilmsContext from '../../contexts/FilmsContext';
import './Films.css';

// function Films({
//   onRemoveFilm,
//   onOpenPopupAddCard,
//   isUserAdmin,
//   isLoading
// }) {
function Films(props) {
  const films = React.useContext(FilmsContext);

  if (props.isLoading) {
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
                onRemoveFilm={props.onRemoveFilm}
                onOpenPopupAddCard={props.onOpenPopupAddCard}
                isUserAdmin={props.isUserAdmin}
              />
            )
        }
      </div>
    </div>
  );
}

export default Films;
