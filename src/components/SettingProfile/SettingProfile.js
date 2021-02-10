import React, { useRef, useState } from 'react';

import './SettingProfile.css';

function SettingProfile({ loggedIn, currentUser, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const inputAvatarRef = useRef('');

  function handleCheckValidity() {
    inputAvatarRef.current.checkValidity()
      ?
      setIsDisabled(false) : setIsDisabled(true);
  }

  function handleLinkAvatar(e) {
    setAvatar(e.target.value);
    handleCheckValidity();
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatar);

    setAvatar('');
  }

  return (
    <div className="setting-profile">
      <h1 className="setting-profile__title">Настройки профиля</h1>
      <div className="setting-profile__container">
        {/* {currentUser.userName} */}
        <form
          className="setting-profile__form"
          onSubmit={handleSubmit}
        >
          <label className="setting-profile__label">
            <input
              className="setting-profile__input"
              type="url"
              name="inputAvatar"
              value={avatar}
              ref={inputAvatarRef}
              onChange={handleLinkAvatar}
              placeholder="Ссылка"
              minLength="2"
              // autoComplete="off"
              required
            />
            <span className="setting-profile__text">Аватар</span>
          </label>

          <button
            type="submit"
            className={`setting-profile__button  ${isDisabled && "setting-profile__button_disabled"}`}
            disabled={isDisabled}
          >
            Обновить
            </button>
        </form>
      </div>
    </div>
  );
}

export default SettingProfile;
