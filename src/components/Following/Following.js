import React from 'react';
import './Following.css';
import FollowingItem from './FollowingItem';


function Following({ users, followings }) {

  return (
    <div className="following">
      <h1 className="following__title">Ваши подписки</h1>
      <div className="following__container">

        {
          followings.length === 0
            ?
            <p className="following__text" >У вас пока нет подписок</p>
            :
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
