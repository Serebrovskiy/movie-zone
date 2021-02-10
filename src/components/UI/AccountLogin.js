import React from 'react';
import { Link } from 'react-router-dom';
import './AccountLogin.css';

function AccountLogin({ onLogin, onSignOut, loggedIn, currentUser }) {
  return (
    <form className="account-login">
      {
        loggedIn
          ?
          <>
            <Link to="/setting-profile" style={{ textDecoration: 'none' }}>
              <img
                className="account-login_avatar"
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
                //src="https://businessman.ru/static/img/n/1/7/6/5/1/3/3/i/1765133.jpg"
                //src="https://avatars.mds.yandex.net/get-ynews/3125310/09d3a6bc5fa50c21fea61665d121fff2/496x248"
                alr={currentUser.userName}
              />
              <p className="account-login_user-name">{currentUser.userName}</p>
            </Link>
            <button type="button" className="account-login_button-out" onClick={onSignOut}>выйти</button>
          </>
          :
          <button type="button" className="account-login_button-enter" onClick={onLogin}>войти</button>
      }
    </form>
  );
}

export default AccountLogin;