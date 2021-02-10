import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import AccountLogin from '../UI/AccountLogin'


function NavBar({ notCheckedFilms, onLogin, onSignOut, loggedIn, currentUser }) {
  return (
    <nav className="menu">
      <div className="menu__container">
        <AccountLogin
          onLogin={onLogin}
          onSignOut={onSignOut}
          loggedIn={loggedIn}
          currentUser={currentUser}
        />
        {loggedIn && <NavLink to="/rating" className="menu__link" activeClassName="menu__link_active">Рейтинг</NavLink>}
        {loggedIn && <NavLink to="/following" className="menu__link" activeClassName="menu__link_active">Подписки</NavLink>}
        <NavLink to="/films" className="menu__link" activeClassName="menu__link_active">Коллекция</NavLink>
        <NavLink to="/search" className="menu__link" activeClassName="menu__link_active">Поиск</NavLink>
        <NavLink exact to="/reviews" className="menu__link" activeClassName="menu__link_active">Обзоры</NavLink>
        <NavLink to="/admin" className="menu__link" activeClassName="menu__link_active">Управление
        {notCheckedFilms.length !== 0 && <span className="menu__link__notification">&nbsp;</span>}
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
