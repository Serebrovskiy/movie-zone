import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './ViewedUser.css';
import RatingCard from '../Rating/RatingCard'

function ViewedUser({ users, ratingCards, onUserFollowings, followings }) {
  const history = useHistory();
  let { _id } = useParams();
  console.log(_id)
  console.log(users)

  const viewedUser = users.find(elem => elem._id === _id); //определяем просматриваемого пользователя
  console.log(viewedUser)

  return (
    <div className="viewed-user">
      <button className="viewed-user__button-go-back" onClick={() => history.goBack()}>Назад</button>
      <p className="viewed-user__title">{viewedUser.userName}</p>
      <div className="viewed-user__container">
        {followings.some(id => id === viewedUser._id) //отрисовываем пользователя в зависимости от наличия подписки
          ?
          <button
            className="viewed-user__button-follow"
            onClick={() => onUserFollowings(viewedUser._id, false)}
          >
            Отписаться
          </button>
          :
          <button
            className="viewed-user__button-follow"
            onClick={() => onUserFollowings(viewedUser._id, true)}
          >
            Подписаться
            </button>
        }
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
