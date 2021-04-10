import React, { useEffect } from 'react';
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
        <div className="popup-user-info">
          <p className="popup-user-info__text">{userCardChecking && userCardChecking.userName}</p>
          <p className="popup-user-info__text">{userCardChecking && userCardChecking.email}</p>
          <img className="popup-user-info__avatar" src={userCardChecking && userCardChecking.avatar} />
          <button
            className="popup-user-info__button-remove"
            type="button"
            onClick={() => onRemoveUser(userCardChecking)}
          >
            Удалить пользователя
           </button>
        </div>
      </Popup>
    </ >
  );
}

export default PopupUserInfo; 