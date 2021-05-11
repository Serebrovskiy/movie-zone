import React from 'react';
import './InfoTooltip.css';

function InfoTooltip({
  isOpen,
  onClose,
  infoTooltip,
  isAdmin,
  onChangeSection,
  numberSection,
  isOpenPopupAddCard,
  isOpenLogin

}) {
  return (
    <div className={`infoTooltip ${isOpen && "infoTooltip_opened"}`}>
      <div className="infoTooltip__form">
        <button className="infoTooltip__button-close" onClick={onClose} />
        <h2 className="infoTooltip__title">{infoTooltip}</h2>
        {(!isAdmin && !numberSection && isOpenPopupAddCard) &&   //не админ и не в разделе выбора фильма из базы
          <>
            <p className="infoTooltip__text">Вы можете выбрать фильм из уже имеющейся коллекции.</p>
            <button type="button" className="infoTooltip__button" onClick={() => onChangeSection(1)}>Перейти к выбору</button>
          </>
        }
        {
          (infoTooltip === 'Вы успешно зарегистрировались!') &&
          <button type="button" className="infoTooltip__button" onClick={isOpenLogin}>Авторизоваться</button>
        }
      </div>
    </div>
  );
}

export default InfoTooltip; 