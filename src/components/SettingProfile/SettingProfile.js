import React, { useRef, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SettingProfile.css';

function SettingProfile({
  onUpdateAvatar,
  onUpdateSocialLinks,
  onInfoTooltip
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [linkVk, setLinkVk] = useState(currentUser.socialLinks[0] || '');
  const [linkFb, setLinkFb] = useState(currentUser.socialLinks[1] || '');
  const [linkInst, setLinkInst] = useState(currentUser.socialLinks[2] || '');
  const [linkYouTube, setLinkYouTube] = useState(currentUser.socialLinks[3] || '');
  const [isDisabled, setIsDisabled] = useState(false);
  const inputAvatarRef = useRef('');
  const inputlinkVkRef = useRef('');
  const inputlinkFbRef = useRef('');
  const inputlinkInstRef = useRef('');
  const inputlinkYouTubeRef = useRef('');


  // function handleCheckValidity() {
  //   inputAvatarRef.current.checkValidity()
  //     ?
  //     setIsDisabled(false) : setIsDisabled(true);
  // }

  function handleLinkAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleLinkVk(e) {
    setLinkVk(e.target.value);
  }

  function handleLinkFb(e) {
    setLinkFb(e.target.value);
  }

  function handleLinkInst(e) {
    setLinkInst(e.target.value);
  }

  function handleLinkYouTube(e) {
    setLinkYouTube(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('отправляем')

    avatar !== '' && onUpdateAvatar(avatar);
    onUpdateSocialLinks([linkVk, linkFb, linkInst, linkYouTube]);

    onInfoTooltip("Данные успешно обновлены");

    // setAvatar('');
    // setLinkVk('');
    // setLinkFb('');
    // setLinkInst('');
    // setLinkYouTube('');
  }

  return (
    <div className="setting-profile">
      <h1 className="setting-profile__title">Настройки профиля</h1>
      <div className="setting-profile__container">
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
            // required
            />
            <span className="setting-profile__text">Аватар</span>
          </label>

          <label className="setting-profile__label">
            <input
              className="setting-profile__input"
              type="url"
              name="inputLinkVk"
              value={linkVk}
              ref={inputlinkVkRef}
              onChange={handleLinkVk}
              placeholder="Ссылка"
              minLength="2"
            />
            <span className="setting-profile__text">Ссылка Вконтакте</span>
          </label>


          <label className="setting-profile__label">
            <input
              className="setting-profile__input"
              type="url"
              name="inputLinkFb"
              value={linkFb}
              ref={inputlinkFbRef}
              onChange={handleLinkFb}
              placeholder="Ссылка"
              minLength="2"
            />
            <span className="setting-profile__text">Ссылка Facebook</span>
          </label>

          <label className="setting-profile__label">
            <input
              className="setting-profile__input"
              type="url"
              name="inputLinkInst"
              value={linkInst}
              ref={inputlinkInstRef}
              onChange={handleLinkInst}
              placeholder="Ссылка"
              minLength="2"
            />
            <span className="setting-profile__text">Ссылка Instagram</span>
          </label>

          <label className="setting-profile__label">
            <input
              className="setting-profile__input"
              type="url"
              name="inputLinkYouTube"
              value={linkYouTube}
              ref={inputlinkYouTubeRef}
              onChange={handleLinkYouTube}
              placeholder="Ссылка"
              minLength="2"
            />
            <span className="setting-profile__text">Ссылка YouTube</span>
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



// test API
// import * as getMovieApi from '../../utils/ApiGoogle';
// const [filmsApi, setFilmsApi] = useState([]);
// function clickApi() {
//   console.log('clickApi')
//   getMovieApi.getMovieApi()
//     .then(res => {
//       // const newFilms = res.results;
//       console.log(res.person.name)
//       // setFilmsApi(newFilms);
//     })
//     .catch((err) => console.error(err));
// }
{/* <button type="button" onClick={clickApi}>Push me</button>
        {
          filmsApi &&
          filmsApi.map(elem =>
            <p key={elem.id}>
              {elem.job}
            </p>
          )
        } */}