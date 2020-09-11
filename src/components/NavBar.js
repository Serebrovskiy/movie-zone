import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';


function NavBar() {
  return (
    <nav className="menu">
      <div className="menu__container">
        <from className="menu__account">
          <input type="text" className="menu__account-input" name="inputLogin" />
          <input type="text" className="menu__account-input" name="inputPassword" />
          <button type="button" className="menu__account-button">войти</button>
        </from>
        <NavLink exact to="/reviews" className="menu__link" activeClassName="menu__link_active">Главная</NavLink>
        <NavLink to="/rating" className="menu__link" activeClassName="menu__link_active">Рейтинг</NavLink>
        <NavLink to="/premieres" className="menu__link" activeClassName="menu__link_active">Премьеры</NavLink>
        <NavLink to="/search" className="menu__link" activeClassName="menu__link_active">Поиск</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
