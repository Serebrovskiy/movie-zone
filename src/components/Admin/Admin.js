import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './Admin.css';

function Admin({ notCheckedFilms }) {

  const { url } = useRouteMatch();

  console.log(notCheckedFilms)

  return (
    <div className="admin">
      <h1 className="admin__title">Управление данными</h1>

      <Link to={`${url}-films`}>
        <button className="admin__button-link">Коллекция
        {notCheckedFilms.length !== 0 && <span className="admin__number-not-checked-films">{notCheckedFilms.length}</span>}
        </button>
      </Link>
      {/* <Link to={`${url}-reviews`}>
        <button className="admin__button-link">Кинообзоры</button>
      </Link> */}

    </div>
  );
}

export default Admin;
