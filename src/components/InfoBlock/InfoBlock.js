import React from 'react';
import { Link } from 'react-router-dom';
import './InfoBlock.css';

function InfoBlock({ loggedIn, onSignOut }) {
  return (
    <div className="info-block">
      <div className="info-block__container">
        {
          loggedIn
          &&
          <div className="info-block__account">

            <>
              <Link to="/setting-profile" style={{ textDecoration: 'none' }}>
                <button type="button" className="info-block__button-setting">настройки</button>
              </Link>
              <button type="button" className="info-block__button-out" onClick={onSignOut}>выход</button>
            </>

          </div>
        }
        <img className="info-block__banner" src="https://m.media-amazon.com/images/M/MV5BZWFjZWMzYWEtODRkZC00ZDU3LWFlMTgtNGE0MDc0YzdkOWViXkEyXkFqcGdeQXVyNjMwMzc3MjE@._V1_SY298_SX201_AL_.jpg" alt=" " />
        <img className="info-block__banner" src="https://m.media-amazon.com/images/M/MV5BNGUxMTVmOGMtY2U5ZS00MjY3LWE2ZDYtNmJmYWU1M2I5ZTczXkEyXkFqcGdeQXVyNjMwMzc3MjE@._V1_SY298_SX201_AL_.jpg" alt=" " />
      </div>
    </div>
  );
}

export default InfoBlock;
