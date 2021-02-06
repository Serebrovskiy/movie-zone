import React, { useState, useEffect, useCallback } from "react";
import { Switch, useLocation, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import InfoBlock from '../InfoBlock/InfoBlock';
import PopupAddCard from '../PopupAddCard/PopupAddCard';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import Login from '../Login/Login';
// import AccountLogin from '../UI/AccountLogin';
// import Reviews from '../Reviews/Reviews'
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/Auth';
import * as api from '../../utils/Api';


function App() {
  // const { pathname } = useLocation(); //расположение текущей странице
  const history = useHistory();

  const [films, setFilms] = useState([]);
  const [ratingCards, setRatingCards] = useState([]);
  const [notCheckedFilms, setNotCheckedFilms] = useState([]);  //список непроверенных карточек  //очень похожие названия
  const [cardChecking, setCardChecking] = useState(null);  //карточка которую мы проверяем
  const [isOpenPopupAddCard, setIsOpenPopupAddCard] = useState(false);
  const [isOpenPopupInfo, setIsOpenPopupInfo] = useState(false);
  const [isOpenPopupLogin, setIsOpenPopupLogin] = React.useState(false);
  const [isOpenPopupRegister, setIsOpenPopupRegister] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [messageError, setMessageError] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState('');
  const [numberSectionPopupAddCard, setNumberSectionPopupAddCard] = useState(0);


  //получаем фильмы коллекции
  const handleGetFilms = useCallback(() => {
    api.getFilms()  //localStorage.token
      .then(res => {
        // console.log(res)
        setFilms(res
          .sort(() => Math.random() - 0.5)
          .map(film => ({
            name: film.name,
            date: film.date,
            link: film.link,
            genres: film.genres,
            country: film.country,
            director: film.director,
            actors: film.actors,
            checked: film.checked,
            id: film._id,
            owner: film.owner
          })));
      })
      .catch((err) => console.error(err));
  }, []);

  //получаем юзера и его карточки рейтинга
  const handleGetUser = useCallback(() => {
    {
      auth.getContent(localStorage.token) //, api.getFilms(localStorage.token)
        .then(res => {
          console.log(res)
          setCurrentUser(res);
          res.ratingFilms && setRatingCards(res.ratingFilms);
        })
        .catch((err) => console.error(err));
    }
  }, []);


  useEffect(() => {

    // const savedRatingCards = JSON.parse(localStorage.getItem('ratingCards') || '[]');
    // setRatingCards(savedRatingCards);

    !ratingCards && setRatingCards([]);

    handleGetFilms();
    tokenCheck();

    console.log('loggedIn - ' + loggedIn)
    console.log(currentUser)
  }, [])

  useEffect(() => {
    setNotCheckedFilms(films.filter(elem => !elem.checked))  //определяем непроверенные фильмы 

    //handleGetFilms();
    // console.log(films)
  }, [films])

  useEffect(() => {
    // localStorage.setItem('ratingCards', JSON.stringify(ratingCards));

    // console.log(ratingCards)
  }, [ratingCards])

  //открываем попап и определяем кто это дедает
  function handlePopupAddCardClick(isAdminOpened, card) {
    setIsOpenPopupAddCard(true);
    setIsAdmin(isAdminOpened);
    card && setCardChecking(card) //если открывает админ, значит редактируем эту карточку
  }

  //попап авторизации
  function handleLoginClick() {
    setIsOpenPopupLogin(true);
    setIsOpenPopupRegister(false);
    setIsOpenPopupInfo(false);
  }

  //попап регистрации 
  function handleRegisterClick() {
    setIsOpenPopupRegister(true);
    setIsOpenPopupLogin(false);
  }

  //попап с информацией 
  function handleInfoClick(message) {
    setIsOpenPopupInfo(true);
    setInfoTooltip(message);
  }

  function closePopups() {
    setIsOpenPopupAddCard(false);
    setIsOpenPopupInfo(false)
    setIsOpenPopupLogin(false);
    setIsOpenPopupRegister(false);
    setCardChecking(null)
  }

  function closePopupInfo() {
    setIsOpenPopupInfo(false)
    setInfoTooltip('');
  }

  function handleChangeSectionPopupAdd(number) {
    setNumberSectionPopupAddCard(number);
    setIsOpenPopupInfo(false)
  }


  //регистрация пользователя
  function handleRegister(password, email, name) {
    auth
      .register(password, email, name)
      .then((res) => {
        if (res.statusCode !== 400) {
          //history.push('/');
          handleInfoClick('Вы успешно зарегистрировались!');

        }
      })
      // .then(() => {
      //   handleLoginClick(); 
      // })
      .catch((err) => {
        console.error(err);
        setMessageError(err.message);
      });
  }

  //авторизация пользователя
  function handleLogin(password, email) {
    return auth
      .authorize(password, email)
      .then((data) => {
        if (!data) {
          throw new Error('Что-то пошло не так!');
        }
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('token', data.token);
          tokenCheck();
        }
      })
      .then(() => {
        history.push('/films')
      })
      .catch((err) => {
        setMessageError(err.message);
      });
  }

  function tokenCheck() {
    if (localStorage.token) {
      auth.getContent(localStorage.token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            //history.push('/');
            handleGetUser();
            closePopups();
          } else {
            localStorage.removeItem('token')
            setLoggedIn(false)
            setCurrentUser({})
          }
        })
        .catch(err => console.error(err));
    }
  }

  //выходим из аккаунта
  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
    setRatingCards([]);
  }

  //сбрасываем ошибки в попапах
  const messageErrorReset = useCallback(() => {
    setMessageError('');
  }, [isOpenPopupLogin, isOpenPopupRegister]);


  //обновление карточек рейтинга в Api
  function handleRatingCardsApi(ratingList) {
    api.updateUser(ratingList, currentUser._id, localStorage.token)
      .then(res => {
        console.log(res)
        setRatingCards(res)
      });
  }

  //добавление карточки рейтинга
  const addRatingCardsHandler = ({
    name,
    date,
    link,
    position,
    id
  }) => {
    const newRatingCard = {
      name,
      date,
      link,
      position,
      new: true,
      id: Date.now()    //уникальный id
    };

    console.log(name)
    //заглушка для картинки
    newRatingCard.link === '' && (newRatingCard.link = "https://www.startfilm.ru/images/base/film/31_03_12/big_86561_15636.jpg")
    newRatingCard.date === '' && (newRatingCard.date = "Неизвестно")

    //кастомный метод для вставки элемента в любую часть массива
    const insert = (arr, index, newItem) => [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index)
    ];

    const ratingList = insert(ratingCards, position - 1, newRatingCard)
      .map((elem, index) => {
        elem.position = index + 1;   //упорядочиваем нумерацию карточек 
        (JSON.stringify(newRatingCard) === JSON.stringify(elem)) ? elem.new = true : elem.new = false; //ставим флаг для новой карточки
        return elem;
      })

    handleRatingCardsApi(ratingList);
  }

  //удаление карточки рейтинга
  const handleRemoveRatingCard = (card) => {

    const ratingList = ratingCards
      .filter(elem => elem.name !== card.name) //раньше было по id, но имя тоже уникальное
      .map((elem, index) => {
        elem.position = index + 1;   //упорядочиваем нумерацию карточек 
        return elem;
      })

    handleRatingCardsApi(ratingList);
  }

  //поднимаем карточку вверх на один пункт
  const handleUpRatingCard = (card) => {
    //кастомный метод для замены объектов в массиве
    const templeFun = (arr) => {
      let arrCopy = {}
      arrCopy = Object.assign({}, arr[card.position - 2])
      arr[card.position - 2] = Object.assign({}, arr[card.position - 1])
      arr[card.position - 1] = Object.assign({}, arrCopy)

      return arr
    }

    const ratingList = templeFun(ratingCards)
      .map((elem, index) => {
        elem.position = index + 1;   //упорядочиваем нумерацию карточек 
        return elem;
      })

    handleRatingCardsApi(ratingList);
  }

  //опускаем карточку вниз на один пункт
  const handleDownRatingCard = (card) => {
    const templeFun = (arr) => {
      let arrCopy = {}
      arrCopy = Object.assign({}, arr[card.position])
      arr[card.position] = Object.assign({}, arr[card.position - 1])
      arr[card.position - 1] = Object.assign({}, arrCopy)

      return arr
    }

    const ratingList = templeFun(ratingCards)
      .map((elem, index) => {
        elem.position = index + 1;   //упорядочиваем нумерацию карточек 
        return elem;
      })

    handleRatingCardsApi(ratingList);
  }

  //добавляем фильм в коллекцию
  const addFilmHandler = ({
    name,
    date,
    link,
    genres,
    country,
    director,
    actors,
    checked,
    //id
  }) => {

    api
      .createFilm(
        name,
        date,
        link,
        genres || [],
        country || '',
        director || '',
        actors || '',
        checked || false,
        //id //= films.length
        localStorage.token,
      )
      .then((res) => {
        console.log(res)

        const newFilm = {
          name: res.name,
          date: res.date,
          link: res.link,
          genres: res.genres,
          country: res.country,
          director: res.director,
          actors: res.actors,
          checked: res.checked,
          owner: res.owner,
          id: res._id
        }
        setFilms([...films, newFilm]);


      })
      .catch((err) => console.error(err));

    // handleGetFilms();
  }

  //удаляем фильм из коллекции
  const handleRemoveFilm = (film) => {
    console.log(film)
    api.deleteFilm(film.id, localStorage.token)
      .then((filmForDelete) => {
        const newFilms = films.filter((elem) => elem.id === film.id ? null : filmForDelete);
        setFilms(newFilms);
      })
      .catch((err) => console.error(err));
  }

  //удаляем или одобряем/обновляем фильм
  const editFilmHandler = (card, remove) => {
    console.log('editFilmHandler')
    //если админ нажал "отклонить" удаляем из коллекции и из рейтинга
    if (remove) {
      handleRemoveFilm(card);
      handleRemoveRatingCard(card);
      closePopups();
    } else {

      api.updateFilm(card, localStorage.token)  //недоделано! 
        .then(film => {
          console.log(film)
        })
        .catch((err) => console.error(err));

      // setFilms(films.map((elem, index) => {
      //   if (elem.name === card.name) {
      //     card.id = index;    // id карточки присваивается её номер индекса, чтобы восстановить исходный
      //     return card
      //   } else {
      //     return elem
      //   };
      // }))
    }
    setCardChecking(null)
    handleGetFilms();
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Main
            onAddFilm={addFilmHandler}
            films={films}
            onRemoveFilm={handleRemoveFilm}
            onOpenPopupAddCard={handlePopupAddCardClick}
            ratingCards={ratingCards}
            notCheckedFilms={notCheckedFilms}
            onRemoveRatingCard={handleRemoveRatingCard}
            onUpRatingCard={handleUpRatingCard}
            onDownRatingCard={handleDownRatingCard}
            handleGetFilms={handleGetFilms}
          />
        </Switch>
        <NavBar
          notCheckedFilms={notCheckedFilms}
          onLogin={handleLoginClick}
          onSignOut={onSignOut}
          loggedIn={loggedIn}
          currentUser={currentUser}
        />
        <InfoBlock />

        <Login
          isOpen={isOpenPopupLogin}
          onClose={closePopups}
          onChangePopup={handleRegisterClick}
          onLogin={handleLogin}
          messageError={messageError}
          messageErrorReset={messageErrorReset}
        />
        <Register
          isOpen={isOpenPopupRegister}
          onClose={closePopups}
          onChangePopup={handleLoginClick}
          onInfoTooltip={handleInfoClick}
          onRegister={handleRegister}
          messageError={messageError}
          messageErrorReset={messageErrorReset}
        />

        <PopupAddCard
          isOpen={isOpenPopupAddCard}
          onClose={closePopups}
          onAddFilm={addFilmHandler}
          onAddRatingCards={addRatingCardsHandler}
          films={films}
          ratingCards={ratingCards}
          isAdmin={isAdmin}
          cardChecking={cardChecking}
          onEditFilm={editFilmHandler}
          onInfoTooltip={handleInfoClick}
          onChangeSection={handleChangeSectionPopupAdd}
          numberSection={numberSectionPopupAddCard}
        />
        <InfoTooltip
          isOpen={isOpenPopupInfo}
          onClose={closePopupInfo}
          infoTooltip={infoTooltip}
          isAdmin={isAdmin}
          onChangeSection={handleChangeSectionPopupAdd}
          numberSection={numberSectionPopupAddCard}
          isOpenPopupAddCard={isOpenPopupAddCard}
        />
        {/* <ProtectedRoute
          // exact path="/saved-news"
          loggedIn={loggedIn}
          currentUser={currentUser}
          pathname={pathname}
        // savedArticleList={savedArticles}
        // onDeleteSavedArticle={handleDeleteSavedArticle}
        // component={Reviews}
        // onLogin={handleLoginClick}
        // onChangePopup={handleLoginClick}
        /> */}
        <Header />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;



  // useEffect(() => {
  //   setNotCheckedFilms(films.filter(elem => !elem.checked))  //определяем непроверенные фильмы 
  //   localStorage.setItem('films', JSON.stringify(films));
  //   console.log(films)

  //   // if (ratingCards.length === 0) {
  //   //   console.log('ratingCards.length === 0')
  //   //   const savedRatingCards = films.map((elem, index) => {
  //   //     elem.position = index + 1;
  //   //     return elem;
  //   //   })

  //   setRatingCards(savedRatingCards);
  //   console.log(savedRatingCards)
  //   //}
  // }, [films])


      //  const savedFilms = JSON.parse(localStorage.getItem('films') || '[]');
    // setFilms(savedFilms
    //   .sort(() => Math.random() - 0.5)
    //   .map((elem, index) => {
    //     return elem
    //   }));

      // localStorage.setItem('films', JSON.stringify(films));