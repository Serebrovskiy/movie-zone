import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './ViewedUser.css';
import RatingCard from '../Rating/RatingCard'

import vkIconColor from '../../images/vk_icon_color.png';
import vkIcon from '../../images/vk_icon.png';
import fbIconColor from '../../images/fb_icon_color.png';
import fbIcon from '../../images/fb_icon.png';
import instIconColor from '../../images/inst_icon_color.png';
import instIcon from '../../images/inst_icon.png';
import youTubeIconColor from '../../images/youTube_icon_color.png';
import youTubeIcon from '../../images/youTube_icon.png';

function ViewedUser({ users, ratingCards, onUserFollowings, followings, loggedIn, isOpenLogin, pathname }) {
  const history = useHistory();
  let { _id } = useParams();
  console.log(_id)
  console.log(users)

  const viewedUser = users.find(elem => elem._id === _id); //определяем просматриваемого пользователя
  console.log(viewedUser)
  console.log(viewedUser.socialLinks[2])


  return (
    <div className="viewed-user">
      <button className="viewed-user__button-go-back" onClick={() => history.goBack()}>Назад</button>
      <div className="viewed-user__container-top">
        <img
          className="viewed-user_avatar"
          src={viewedUser.avatar || 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
          alt={viewedUser.userName}
        />
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          <h2 className="viewed-user__title">{viewedUser.userName}</h2>
          <ul className="viewed-user__icon-list">
            <li className="viewed-user__icon-item">
              {
                viewedUser.socialLinks[0]
                  ?
                  <a href={viewedUser.socialLinks[0]} className="viewed-user__column-link" target="_blank" rel="noreferrer">
                    <img className="viewed-user__social-icon viewed-user__social-icon_active" src={vkIconColor} alt="vk" />
                  </a>
                  :
                  <img className="viewed-user__social-icon" src={vkIcon} alt="vk" />
              }
            </li>
            <li className="viewed-user__icon-item">
              {
                viewedUser.socialLinks[1]
                  ?
                  <a href={viewedUser.socialLinks[1]} className="viewed-user__column-link" target="_blank" rel="noreferrer">
                    <img className="viewed-user__social-icon viewed-user__social-icon_active" src={fbIconColor} alt="facebook" />
                  </a>
                  :
                  <img className="viewed-user__social-icon" src={fbIcon} alt="facebook" />
              }
            </li>
            <li className="viewed-user__icon-item">
              {
                viewedUser.socialLinks[2]
                  ?
                  <a href={viewedUser.socialLinks[2]} className="viewed-user__column-link" target="_blank" rel="noreferrer">
                    <img className="viewed-user__social-icon viewed-user__social-icon_active" src={instIconColor} alt="instagram" />
                  </a>
                  :
                  <img className="viewed-user__social-icon" src={instIcon} alt="instagram" />
              }
            </li>
            <li className="viewed-user__icon-item">
              {
                viewedUser.socialLinks[3]
                  ?
                  <a href={viewedUser.socialLinks[3]} className="viewed-user__column-link" target="_blank" rel="noreferrer">
                    <img className="viewed-user__social-icon viewed-user__social-icon_active" src={youTubeIconColor} alt="youtube" />
                  </a>
                  :
                  <img className="viewed-user__social-icon" src={youTubeIcon} alt="youtube" />
              }
            </li>
          </ul>
          <div className="viewed-user__container">
            {followings.some(id => id === viewedUser._id) //отрисовываем кнопку в зависимости от наличия подписки
              ?
              <button
                className="viewed-user__button-follow"
                onClick={() => onUserFollowings(viewedUser._id, false)}
              >
                Отписаться
          </button>
              :
              <button
                className="viewed-user__button-follow viewed-user__button-follow_gold"
                // ({loggedIn ? onClick={() => onUserFollowings(viewedUser._id, true)} : onClick={() => onUserFollowings(viewedUser._id, true)}})
                onClick={() => { loggedIn ? onUserFollowings(viewedUser._id, true) : isOpenLogin() }}
              >
                Подписаться
            </button>
            }
          </div>
        </div>
      </div>
      <div className="viewed-user__rating">
        {
          viewedUser.ratingFilms.length === 0
            ?
            <p className="following__place-text" >У пользователя еще нет фильмов в рейтинге</p>
            :
            viewedUser.ratingFilms.map(elem =>
              <RatingCard
                item={elem}
                key={elem._id}
                ratingCards={ratingCards}
                pathname={pathname}
              />
            )
        }
      </div>
    </div>
  );
}

export default ViewedUser;
