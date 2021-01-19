import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import AccountLogin from '../UI/AccountLogin'


function NavBar() {
  return (
    <nav className="menu">
      <div className="menu__container">
        <AccountLogin />
        <NavLink exact to="/reviews" className="menu__link" activeClassName="menu__link_active">Обзоры</NavLink>
        <NavLink to="/rating" className="menu__link" activeClassName="menu__link_active">Рейтинг</NavLink>
        <NavLink to="/films" className="menu__link" activeClassName="menu__link_active">Коллекция</NavLink>
        <NavLink to="/search" className="menu__link" activeClassName="menu__link_active">Поиск</NavLink>
        <NavLink to="/admin" className="menu__link" activeClassName="menu__link_active">Управление</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
