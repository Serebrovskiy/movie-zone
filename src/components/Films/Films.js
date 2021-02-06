import React from 'react';
import './Films.css';
import FilmsItem from './FilmsItem';


function Films({ films, onRemoveFilm }) {

  //console.log(films)

  return (
    <div className="films">
      <h1 className="films__title">Коллекция фильмов</h1>
      <div className="films__container">
        {
          films.map(elem =>
            <FilmsItem
              item={elem}
              key={elem.id}
              onRemoveFilm={onRemoveFilm}
            />
          )
        }
      </div>
    </div>
  );
}

export default Films;
