import React from 'react';
import './FollowingItem.css';
import { Link, useRouteMatch } from 'react-router-dom';

function FollowingItem({ user, onRemoveFilm }) {

  const { url } = useRouteMatch();
  // console.log(user)

  return (
    <div className="following-item">
      {/* <button className="following-item__button-remove" onClick={() => onRemoveFilm(user)} /> */}
      <Link to={`user/${user._id}`} style={{ textDecoration: 'none' }}>
        {/* <img className="following-item__image" src={user.link || "https://www.startfilm.ru/images/base/film/31_03_12/big_86561_15636.jpg"} alt="" /> */}
        <div className="following-item__container">
          <h3 className="following-item__name">{user.userName || "Подписчик"}</h3>
          <p className="following-item__date">Количество фильмов: <span style={{ fontWeight: '600' }}>{user.ratingFilms.length || "Много"}</span></p>
          {/* <p className="films-item__date">{user.date || "Неизвестно"} г.</p> */}
        </div>
      </Link>
    </div>
  );
}

export default FollowingItem;
