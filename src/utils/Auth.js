import { BASE_URL_API } from './config';

export const register = (password, email, userName) => {
  return fetch(`${BASE_URL_API}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email, userName })
  })
    .then((res) => {
      if (res.status === 409) {
        throw new Error('Такой пользователь уже есть');
      }
      if (!res.ok) {
        throw new Error('Вам отказано в регистрации');
      }
      return res.json();
    })
    .then((res) => {
      return res;
    })
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL_API}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email })
  })
    .then((res => {
      if (res.status === 400) {
        throw new Error('Введены некорректные данные');
      }
      if (res.status === 401) {
        throw new Error('Данные переданы с ошибкой или не полностью');
      }
      return res.json();
    })
    )
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return;
      }
    })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL_API}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
};