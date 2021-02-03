import React from 'react';
import './Footer.css';

function Footer({ onLogin }) {
  return (
    <div className="footer">
      <p className="footer__copyright" onClick={onLogin}>© 2021 Movie-Zone</p>
    </div>
  );
}

export default Footer;
