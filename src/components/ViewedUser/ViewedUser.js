import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './ViewedUser.css';
import RatingCard from '../Rating/RatingCard'
import instIcon from '../../images/inst_icon.png';
import youTubeIcon from '../../images/youTube_icon.png';
import vkIcon from '../../images/vk_icon.png';
import fbIcon from '../../images/fb_icon.png';

function ViewedUser({ users, ratingCards, onUserFollowings, followings, loggedIn, isOpenLogin }) {
  const history = useHistory();
  let { _id } = useParams();
  // console.log(_id)
  // console.log(users)

  const viewedUser = users.find(elem => elem._id === _id); //определяем просматриваемого пользователя
  // console.log(viewedUser)

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
              {/* <a href="#" className="viewed-user__column-link" target="_blank" rel="noreferrer"> */}
              <img className="viewed-user__social-icon" src={instIcon} alt="instagram" />
              {/* </a> */}
            </li>
            <li className="viewed-user__icon-item">
              {/* <a href="#" className="viewed-user__column-link" target="_blank" rel="noreferrer"> */}
              <img className="viewed-user__social-icon" src={youTubeIcon} alt="youtube" />
              {/* </a> */}
            </li>
            <li className="viewed-user__icon-item">
              {/* <a href="#" className="viewed-user__column-link" target="_blank" rel="noreferrer"> */}
              <img className="viewed-user__social-icon" src={vkIcon} alt="vk" />
              {/* </a> */}
            </li>
            <li className="viewed-user__icon-item">
              {/* <a href="#" className="viewed-user__column-link" target="_blank" rel="noreferrer"> */}
              <img className="viewed-user__social-icon" src={fbIcon} alt="facebook" />
              {/* </a> */}
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
          viewedUser.ratingFilms.map(elem =>
            <RatingCard
              item={elem}
              key={elem._id}
              ratingCards={ratingCards}
            />
          )
        }
      </div>
    </div>
  );
}

export default ViewedUser;
