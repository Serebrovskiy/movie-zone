import React from 'react';
import './Popup.css';

function Popup({
  isOpen,
  onClose,
  onChangePopup,
  onInfoTooltip,
  onSubmit,
  title,
  buttonName,
  linkName,
  isDisabled,
  messageError,
  messageErrorReset,
  children
}) {

  React.useEffect(() => {
    setTimeout(messageErrorReset, 2000);
  }, [messageError]);

  return (
    < >
      <div className={`popup ${isOpen && "popup_opened"}`}>
        <form className="popup__form" onSubmit={onSubmit}>
          <button type="button" className="popup__button-close" onClick={onClose} />
          <h2 className="popup__title">{title}</h2>
          {children}
          <div className="popup__container">
            <span className="popup__messageError">{messageError}</span>
            <button
              type="submit"
              className={`popup__button ${isDisabled && "popup__button_disabled"}`}
              disabled={isDisabled}
              onClick={messageError ? onInfoTooltip : null}
            >
              {buttonName}
            </button>
          </div>
          <p className="popup__text">или&nbsp;
            <span className="popup____text-link" onClick={onChangePopup}>
              {linkName}
            </span>
          </p>
        </form>
      </div>
    </ >
  );
}

export default Popup; 