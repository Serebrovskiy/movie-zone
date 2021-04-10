import React, { useEffect } from 'react';
import './FilmsPage.css';
import { useParams, useHistory, Link, useRouteMatch } from 'react-router-dom';
// import * as api from '../../utils/Api';

function FilmsPage({
  films,
  handleGetFilms,
  users,
  currentUser,
  pathname
}) {
  //const [viewedUser, setViewedUser] = React.useState({});
  //const [currentFilm, setCurrentFilm] = React.useState({});



  let { id } = useParams();
  const history = useHistory();

  //Берем фильм напрямую из Api
  // useEffect(() => {
  //   console.log('hello')

  //   async function f() {
  //     console.log('async')

  //     await api.getFilmById(id)
  //       .then(res => setCurrentFilm(res))
  //       .catch((err) => console.error(err));
  //   }
  //   f();
  // }, [])

  let currentFilm;

  console.log(films)
  console.log(pathname)

  if (films.length !== 0) {
    currentFilm = films
      .sort(function (a, b) {     //сортируем по рейтингу и добавляем позицию к каждому фильму
        return a.totalRange - b.totalRange;
      })
      .reverse()
      .map((elem, index) => {
        elem.position = index + 1;
        return elem
      })
      .filter(elem => id === elem.id)[0];  //получаем актуальный фильм 
    // setCurrentFilm(films.filter(elem => id === elem.id)[0])
  }

  const viewedUser = users.find(elem => elem._id === currentFilm.owner);  //получаем юзера которого просматриваем

  // useEffect(() => {
  //   if (films.length !== 0) {
  //     // currentFilm = films.filter(elem => id === elem.id)[0];  //получаем актуальный фильм 
  //     //  setCurrentFilm(films.filter(elem => id === elem.id)[0])
  //   }
  //   setViewedUser(users.find(elem => elem._id === currentFilm.owner));
  // }, [])

  //получаем юзера который создал карточку
  console.log(id)
  console.log(currentFilm)
  console.log(currentUser)
  console.log(viewedUser)
  //как то не очень работает
  // else {
  //   showFilms()
  //     .then(res => {
  //       currentFilm = res.filter(elem => id === elem._id)[0];
  //     })
  // }
  // async function showFilms() {
  //   let response = await api.getFilms()
  //   return response;
  // }

  //грубая заглшка, films приходит пустой, то берем массив из localStorage
  //films.length === 0 && (films = JSON.parse(localStorage.getItem('films')));


  return (
    <div className="films-page">
      <button className="films-page__button-go-back" onClick={() => history.goBack()}>Назад</button>
      <div className="films-page__container-main">
        <h3 className="films-page__name">{currentFilm && currentFilm.name}</h3>
        <div className="films-page__container">
          <img className="films-page__image" src={currentFilm && currentFilm.link} alt="" />
          {/* <h3 className="films-page__name">{currentFilm && currentFilm.name}</h3> */}
          <ul className="films-page__list">
            <li className="films-page__about">
              <p className="films-page__text">Премьера:</p>
              <p className="films-page__text-data">{currentFilm && currentFilm.date} г.</p>
            </li>
            <li className="films-page__about">
              <p className="films-page__text">Жанр:</p>
              <div className="films-page__text-container">
                {currentFilm && currentFilm.genres.map((elem, index) => <p className="films-page__text-data" key={index}>{elem}</p>)}
              </div>
            </li>
            <li className="films-page__about">
              <p className="films-page__text">Страна:</p>
              <p className="films-page__text-data">{currentFilm && currentFilm.country}</p>
            </li>
            <li className="films-page__about">
              <p className="films-page__text">Режиссер:</p>
              <p className="films-page__text-data">{currentFilm && currentFilm.director}</p>
            </li>
            <li className="films-page__about">
              <p className="films-page__text">В ролях:</p>
              <div className="films-page__text-container">
                {currentFilm && currentFilm.actors.map((elem, index) => <p className="films-page__text-data" key={index}>{elem}</p>)}
              </div>
            </li>

            <li className="films-page__about">
              <p className="films-page__text">Место в рейтинге MZ:</p>
              <div className="films-page__text-container">
                {/* <p className="films-page__text-data">&nbsp;</p><br /> */}
                <p className="films-page__text-data films-page__text-data_position">{currentFilm && currentFilm.position}</p>
                {/* <p className="films-page__text-data">{currentFilm && positionFilm()}</p> */}

              </div>
            </li>

            <li className="films-page__about">
              <p className="films-page__text">Опубликовал:</p>
              <div className="films-page__text-container">
                {/* надо придумать защиту если юзера по каким то причинам нет */}


                <Link to={(viewedUser._id === currentUser._id) ? "/rating" : `/user/${viewedUser._id}`} style={{ textDecoration: 'none' }}>
                  <p className="films-page__text-data films-page__text-data_link-user" >{currentFilm && viewedUser ? viewedUser.userName : "Movie-zone"}</p>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FilmsPage;