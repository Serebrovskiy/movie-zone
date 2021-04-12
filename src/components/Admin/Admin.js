import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

function Admin({ notCheckedFilms, users }) {

  return (
    <div className="admin">
      <h1 className="admin__title">Управление данными</h1>

      <Link to="/admin-films">
        <button className="admin__button-link">Коллекция
        {notCheckedFilms.length !== 0 && <span className="admin__number-not-checked-films">{notCheckedFilms.length}</span>}
        </button>
      </Link>
      <Link to="/admin-users">
        <button className="admin__button-link">Пользователи
        {users.length !== 0 && <span className="admin__number-users">{users.length}</span>}
        </button>
      </Link>

      {/* <Link to=to="/admin-reviews>
        <button className="admin__button-link">Кинообзоры</button>
      </Link> */}

    </div>
  );
}

export default Admin;
