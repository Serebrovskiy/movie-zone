import React from 'react';
import './Register.css';
import Popup from '../Popup/Popup';
import ValidationForm from '../../utils/ValidationForm';

function Register({
  isOpen,
  onClose,
  onChangePopup,
  onInfoTooltip,
  onRegister,
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
    onRegister(values.password, values.email, values.name);
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
        onInfoTooltip={onInfoTooltip}
        onSubmit={handleSubmit}
        title='Регистрация'
        buttonName='Зарегистрироваться'
        linkName='Войти'
        isDisabled={!isValid}
        messageError={messageError}
        messageErrorReset={messageErrorReset}
      >
        <div className="register">
          <p className="register__input-title">Email</p>
          <input
            type="text"
            name="email"
            className="register__input"
            placeholder="Введите почту"
            minLength="3"
            maxLength="30"
            pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            onChange={handleChange}
            value={values.email || ''}
            required />
          <span className="register__error-text">{errors.email}</span>
          <p className="register__input-title">Пароль</p>
          <input
            type="password"
            name="password"
            className="register__input"
            placeholder="Введите пароль"
            minLength="3"
            maxLength="30"
            onChange={handleChange}
            value={values.password || ''}
            required />
          <span className="register__error-text">{errors.password}</span>
          <p className="register__input-title">Имя</p>
          <input
            type="text"
            name="name"
            className="register__input"
            placeholder="Введите имя"
            minLength="3"
            maxLength="30"
            pattern="^[a-zA-Z0-9а-яА-Я\s-]+$"
            onChange={handleChange}
            value={values.name || ''}
            required />
          <span className="register__error-text">{errors.name}</span>
        </div>
      </Popup>
    </ >
  );
}

export default Register; 