import React from 'react';
import FollowingItem from './FollowingItem';
import './Following.css';

function Following({ users, followings }) {
  if (!followings.length) {
    return <p className="following__text" >У вас пока нет подписок</p>
  }
  return (
    <div className="following">
      <h1 className="following__title">Ваши подписки</h1>
      <div className="following__container">
        {
          users
            .filter(id => followings.find(fId => fId === id._id))  //отрисовываем только тех юзеров, которые есть в списке followings
            .map(user =>
              <FollowingItem
                user={user}
                key={user._id}
              />)
        }
      </div>
    </div>
  );
}

export default Following;
