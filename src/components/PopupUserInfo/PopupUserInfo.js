import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PopupUserInfo.css';
import Popup from '../Popup/Popup';

function PopupUserInfo({
  isOpen,
  onClose,
  onChangePopup,
  userCardChecking,
  onRemoveUser,
}) {


  function handleSubmit(evt) {
    evt.preventDefault();

  }

  return (
    < >
      <Popup
        isOpen={isOpen}
        onClose={onClose}
        onChangePopup={onChangePopup}
        onSubmit={handleSubmit}
        title='Карточка пользователя'
        buttonName='UserInfo'
        linkName='Не нужна'
      >
        {userCardChecking &&
          <div className="popup-user-info">
            <img className="popup-user-info__avatar" src={userCardChecking.avatar} />
            <p className="popup-user-info__text"><strong>{userCardChecking.userName}</strong></p>
            <p className="popup-user-info__text">{userCardChecking.email}</p>
            <p className="popup-user-info__text">Кол-во фильмов в рейтинге: {userCardChecking.ratingFilms.length}</p>
            <p className="popup-user-info__text">Кол-во подписок: {userCardChecking.followings.length}</p>
            <Link className="popup-user-info__text-link" to={`/user/${userCardChecking._id}`} onClick={onClose}>
              <p className="popup-user-info__text">Ссылка на страницу &#10511;</p>
            </Link>

            <button
              className="popup-user-info__button-remove"
              type="button"
              onClick={() => onRemoveUser(userCardChecking)}
            >
              Удалить пользователя
           </button>
          </div>
        }
      </Popup>
    </ >
  );
}

export default PopupUserInfo; 