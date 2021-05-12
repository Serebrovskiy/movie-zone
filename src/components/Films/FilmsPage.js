import React from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import UsersContext from '../../contexts/UsersContext';
import FilmsContext from '../../contexts/FilmsContext';
import './FilmsPage.css';

function FilmsPage() {
  const currentUser = React.useContext(CurrentUserContext);
  const users = React.useContext(UsersContext);
  const films = React.useContext(FilmsContext);

  let { id } = useParams();
  const history = useHistory();

  let currentFilm;

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
  }

  //получаем юзера которого просматриваем
  const viewedUser = users.find(elem => {
    if (currentFilm) {
      return elem._id === currentFilm.owner
    }
  });

  return (
    <>
      {currentFilm &&
        <div className="films-page">
          <button className="films-page__button-go-back" onClick={() => history.goBack()}>Назад</button>
          <div className="films-page__container-main">
            <h3 className="films-page__name">{currentFilm.name}</h3>
            <div className="films-page__container">
              <img className="films-page__image" src={currentFilm.link} alt="" />
              <ul className="films-page__list">
                <li className="films-page__about">
                  <p className="films-page__text">Премьера:</p>
                  <p className="films-page__text-data">{currentFilm.date} г.</p>
                </li>
                <li className="films-page__about">
                  <p className="films-page__text">Жанр:</p>
                  <div className="films-page__text-container">
                    {currentFilm.genres.map((elem, index) => <p className="films-page__text-data" key={index}>{elem}</p>)}
                  </div>
                </li>
                <li className="films-page__about">
                  <p className="films-page__text">Страна:</p>
                  <p className="films-page__text-data">{currentFilm.country}</p>
                </li>
                <li className="films-page__about">
                  <p className="films-page__text">Режиссер:</p>
                  <p className="films-page__text-data">{currentFilm.director}</p>
                </li>
                <li className="films-page__about">
                  <p className="films-page__text">В ролях:</p>
                  <div className="films-page__text-container">
                    {currentFilm.actors.map((elem, index) => <p className="films-page__text-data" key={index}>{elem}</p>)}
                  </div>
                </li>

                <li className="films-page__about">
                  <p className="films-page__text">Место в рейтинге MZ:</p>
                  <div className="films-page__text-container">
                    <p className="films-page__text-data films-page__text-data_position">{currentFilm.position}</p>
                  </div>
                </li>

                <li className="films-page__about">
                  <p className="films-page__text">Опубликовал:</p>
                  <div className="films-page__text-container">
                    {
                      viewedUser ? /*если юзера по каким то причинам нет */
                        <Link className="films-page__link" to={(viewedUser._id === currentUser._id) ? "/rating" : `/user/${viewedUser._id}`} >
                          <p className="films-page__text-data films-page__text-data_link-user" >{viewedUser.userName}</p>
                        </Link>
                        :
                        <p className="films-page__text-data ">Movie-Zone</p>
                    }
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default FilmsPage;