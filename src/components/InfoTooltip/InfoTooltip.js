import React from 'react';
import './InfoTooltip.css';
// import { Link } from 'react-router-dom';

function InfoTooltip({
  isOpen,
  onClose,
  infoTooltip,
  isAdmin,
  onChangeSection,
  numberSection
}) {
  return (
    <div className={`infoTooltip ${isOpen && "infoTooltip_opened"}`}>
      <div className="infoTooltip__form">
        <button className="infoTooltip__button-close" onClick={onClose} />
        <h2 className="infoTooltip__title">{infoTooltip}</h2>
        {(!isAdmin && !numberSection) &&   //не админ и не в разделе выбора фильма из базы
          <>
            <p className="infoTooltip__text">Вы можете выбрать фильм из уже имеющейся коллекции.</p>
            <p className="infoTooltip__text-link" onClick={() => onChangeSection(1)}>Перейти к выбору</p>
          </>
        }
        {/* <Link className="infoTooltip__link" onClick={onLogin} to="/"> </Link> */}
      </div>
    </div>
  );
}

export default InfoTooltip; 