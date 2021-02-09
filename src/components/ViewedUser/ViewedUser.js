import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './ViewedUser.css';
import RatingCard from '../Rating/RatingCard'

function ViewedUser({ users, ratingCards }) {
  const history = useHistory();
  let { _id } = useParams();
  console.log(_id)
  console.log(users)

  const viewedUser = users.find(elem => elem._id === _id);
  console.log(viewedUser)

  return (
    <div className="viewed-user">
      <button className="viewed-user__button-go-back" onClick={() => history.goBack()}>Назад</button>
      <p className="viewed-user__title">Страница пользователя {viewedUser.userName}</p>
      <div className="viewed-user__container">

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
