import React from 'react';
import './Login.css';
import Popup from '../Popup/Popup';
import ValidationForm from '../../utils/ValidationForm';

function Login({
  isOpen,
  onClose,
  onChangePopup,
  onLogin,
  messageError,
  messageErrorReset
}) {

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = ValidationForm();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values.password, values.email);
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    < >
      <Popup
        isOpen={isOpen}
        onClose={onClose}
        onChangePopup={onChangePopup}
        onSubmit={handleSubmit}
        title='Вход' buttonName='Войти'
        linkName='Зарегистрироваться'
        isDisabled={!isValid}
        messageError={messageError}
        messageErrorReset={messageErrorReset}
      >
        <div className="login">
          <p className="login__input-title">Email</p>
          <input
            type="text"
            name="email"
            className="login__input"
            placeholder="Введите почту"
            minLength="3"
            maxLength="30"
            pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            onChange={handleChange}
            value={values.email || ''}
            required
          />
          <span className="login__error-text">{errors.email}</span>
          <p className="login__input-title">Пароль</p>
          <input
            type="password"
            name="password"
            className="login__input"
            placeholder="Введите пароль"
            minLength="3"
            maxLength="30"
            onChange={handleChange}
            value={values.password || ''}
            required
          />
          <span className="login__error-text">{errors.password}</span>
        </div>
      </Popup>
    </ >
  );
}

export default Login; 