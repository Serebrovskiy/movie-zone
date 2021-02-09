import React from 'react';
import './AccountLogin.css';

function AccountLogin({ onLogin, onSignOut, loggedIn, currentUser }) {
  return (
    <form className="account-login">
      {
        loggedIn
          ?
          <>
            <p className="account-login_user-name">{currentUser.userName}</p>
            <button type="button" className="account-login_button-out" onClick={onSignOut}>выйти</button>
          </>
          :
          <button type="button" className="account-login_button-enter" onClick={onLogin}>войти</button>
      }
    </form>
  );
}

export default AccountLogin;