import React from 'react';
import './Films.css';
import FilmsItem from './FilmsItem';


function Films({ films, onRemovePremier }) {

  return (
    <div className="films">
      <h1 className="films__title">Коллекция фильмов</h1>
      <div className="films__container">
        {
          films.map(elem =>
            <FilmsItem
              item={elem}
              key={elem.id}
              onRemovePremier={onRemovePremier}
            />
          )
        }
      </div>
    </div>
  );
}

export default Films;