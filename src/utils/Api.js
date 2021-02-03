const BASE_URL_API = 'http://localhost:3001'

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
};

export const getFilms = () => {
  return fetch(`${BASE_URL_API}/films`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(getResponse)
};

export const createFilm = (
  name,
  date,
  link,
  genres,
  country,
  director,
  actors,
  checked,
  id
) => {
  return fetch(`${BASE_URL_API}/films`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      date,
      link,
      genres,
      country,
      director,
      actors,
      checked,
      id
    })
  })
    .then(getResponse)
};

export const deleteFilm = (filmId) => {
  console.log(filmId)
  return fetch(`${BASE_URL_API}/films/${filmId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(getResponse)
};

export const updateFilm = (
  film
) => {
  console.log(film.name)
  return fetch(`${BASE_URL_API}/films/${film.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(film)
  })
    .then(getResponse)
};