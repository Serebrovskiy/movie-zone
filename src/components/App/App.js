import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import InfoBlock from '../InfoBlock/InfoBlock';
import PopupAddCard from '../PopupAddCard/PopupAddCard';
import PopupUserInfo from '../PopupUserInfo/PopupUserInfo';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Register from '../Register/Register';
import Login from '../Login/Login';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/Auth';
import * as api from '../../utils/Api';
import * as getImageGoogle from '../../utils/ApiGoogle';

function App() {
  const { pathname } = useLocation(); //расположение текущей странице
  const history = useHistory();

  const [films, setFilms] = useState([]);
  const [ratingCards, setRatingCards] = useState([]);
  const [notCheckedFilms, setNotCheckedFilms] = useState([]);  //список непроверенных карточек  //очень похожие названия
  const [users, setUsers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [cardChecking, setCardChecking] = useState(null);  //карточка которую мы проверяем
  const [userCardChecking, setUserCardChecking] = useState(null);  //карточка юзера которую мы проверяем в админке
  const [isOpenPopupAddCard, setIsOpenPopupAddCard] = useState(false);
  const [isOpenPopupUserInfo, setIsOpenPopupUserInfo] = React.useState(false);  //попап юзера в админке
  const [isOpenPopupInfo, setIsOpenPopupInfo] = useState(false);
  const [isOpenPopupLogin, setIsOpenPopupLogin] = React.useState(false);
  const [isOpenPopupRegister, setIsOpenPopupRegister] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [messageError, setMessageError] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [isAdmin, setIsAdmin] = useState(false);  //это надо исправить, не корректно 
  const [isUserAdmin, setIsUserAdmin] = useState(false); //если пользователь админ
  const [infoTooltip, setInfoTooltip] = useState('');
  const [numberSectionPopupAddCard, setNumberSectionPopupAddCard] = useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    console.log(pathname)
    pathname === '/films' && handleGetFilms();
  }, [pathname])

  //получаем фильмы коллекции
  const handleGetFilms = useCallback(() => {
    console.log('handleGetFilms')
    let newFilms = [];

    setIsLoading(true);
    api.getFilms()
      .then(res => {
        newFilms = res
          .map(film =>
          ({
            name: film.name,
            date: film.date,
            link: film.link,
            genres: film.genres,
            country: film.country,
            director: film.director,
            actors: film.actors,
            checked: film.checked,
            totalRange: film.totalRange,
            id: film._id,
            owner: film.owner
          })
          )
        console.log(newFilms)
      })
      .then(res => (setFilms([...newFilms])))
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      })

  }, []);

  // получаем всех пользователей
  const handleGetUsers = () => {
    console.log('handleGetUsers')
    api.getUsers() //localStorage.token
      .then(res => {
        console.log(res)
        setUsers(res)  //обновляем юзеров 
        topRatingFilms(res) //вызываем top-10 с обновленными юзерами
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    handleGetUsers();  // обновляем список юзеров
    tokenCheck();
    handleGetFilms();  // обновляем список фильмов

    !ratingCards && setRatingCards([]);

    console.log('loggedIn - ' + loggedIn)
    console.log(currentUser)
  }, [])


  useEffect(() => {
    setNotCheckedFilms(films.filter(elem => !elem.checked))  //определяем непроверенные фильмы 
  }, [films])

  //открываем попап и определяем кто это дедает - точнее откуда
  function handlePopupAddCardClick(isAdminOpened, card) {
    setIsOpenPopupAddCard(true);
    setIsAdmin(isAdminOpened);  //это лишнее, нужно исправить
    card && setCardChecking(card) //если открывает админ, значит редактируем эту карточку   //не понял этот коммент //аа понял
  }

  function handlePopupUserInfoClick(user) {
    setIsOpenPopupUserInfo(true);
    user && setUserCardChecking(user)
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
    setIsOpenPopupUserInfo(false);
    setIsOpenPopupInfo(false)
    setIsOpenPopupLogin(false);
    setIsOpenPopupRegister(false);
    setCardChecking(null)
  }

  function closePopupInfo() {
    setIsOpenPopupInfo(false)
    setIsOpenPopupRegister(false);
    setInfoTooltip('');
  }

  function handleChangeSectionPopupAdd(number) {
    setNumberSectionPopupAddCard(number);
    setIsOpenPopupInfo(false)
  }

  //регистрация пользователя
  function handleRegister(password, email, userName) {
    auth
      .register(password, email, userName)
      .then((res) => {
        if (res.statusCode !== 400) {
          //history.push('/');
          handleInfoClick('Вы успешно зарегистрировались!');

        }
      })
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
    console.log('tokenCheck')
    if (localStorage.token) {
      auth.getContent(localStorage.token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            handleGetUsers(); // обновляем список юзеров
            setCurrentUser(res);
            res.ratingFilms && setRatingCards(res.ratingFilms);  //забираем рейтинг фильмов
            setFollowings(res.followings)  //забираем подписки
            checkingAdminByEmail(res.email) //проверяем админ или нет
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
    setCurrentUser({});
    setFollowings([]);
    setIsUserAdmin(false)
  }
  //сбрасываем ошибки в попапах
  const messageErrorReset = useCallback(() => {
    setMessageError('');
  }, [isOpenPopupLogin, isOpenPopupRegister]);


  //проверка является ли юзер админом
  function checkingAdminByEmail(userEmail) {
    //используем переменную окружения
    process.env.REACT_APP_VERIFIED_EMAILS.includes(userEmail)
      && setIsUserAdmin(true)
  }

  //обновление карточек рейтинга в Api
  function handleRatingCardsApi(ratingList) {
    api.updateUser(ratingList, currentUser._id, localStorage.token)
      .then(res => {
        setRatingCards(res);
        handleGetUsers();
      });
  }

  //добавление карточки рейтинга
  const addRatingCardsHandler = ({
    name,
    date,
    link,
    position,
    genres,
    country,
    director,
    actors,
    checked,
    id,
  }, fromSearch) => {

    async function addRatingCard() {
      //получаем ссылку на картинку из googleApi
      let promise = new Promise((resolve, reject) => {
        getImageGoogle.getImageGoogle(name, date)
          .then(res => {
            return {
              name,
              date,
              link: link || res,   //прикрепляем ссылку
              position,
              new: true,
              id: Date.now()    //уникальный id
            };
          })
          .then(res => resolve(res))
      });

      let newRatingCard = await promise; // будет ждать, пока промис не выполнится
      // console.log(newRatingCard);

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

      const newCard = {
        name,
        date,
        link: link || newRatingCard.link,
        genres,
        country,
        director,
        actors,
        checked,
      }

      !fromSearch &&
        addFilmHandler(newCard)  //дублируем карточку фильма в коллекцию 
    }
    addRatingCard(); //вызываем асинхронную функцию
    handleGetFilms(); //обновляем фильмы
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

  //добавляем фильм только в коллекцию, для админа
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
        // console.log(res)
        const newFilm = {
          name: res.name,
          date: res.date,
          link: res.link,
          genres: res.genres,
          country: res.country,
          director: res.director,
          actors: res.actors,
          checked: res.checked,
          totalRange: res.totalRange,
          owner: res.owner,
          id: res._id
        }
        setFilms([...films, newFilm]);
        handleGetFilms();
        console.log(newFilm)
      })
      .catch((err) => console.error(err));
  }

  //удаляем фильм из коллекции
  const handleRemoveFilm = (film) => {
    // console.log(film)
    api.deleteFilm(film.id, localStorage.token)
      .then((filmForDelete) => {
        const newFilms = films.filter((elem) => elem.id === film.id ? null : filmForDelete);
        setFilms(newFilms);
      })
      .catch((err) => console.error(err));
  }

  //удаляем или одобряем/обновляем фильм
  const editFilmHandler = (card, remove) => {
    //если админ нажал "отклонить"(remove) удаляем из коллекции и из рейтинга
    if (remove) {
      handleRemoveFilm(card);
      handleRemoveRatingCard(card);
      closePopups();
    } else {

      api.updateFilm(card, localStorage.token)  //недоделано! 
      // .then(film => {
      //   console.log(film)
      // })
      // .catch((err) => console.error(err));
    }
    setCardChecking(null)
    handleGetFilms();
  }


  //удаляем пользователя
  const handleRemoveUser = (user) => {
    api.deleteUser(user._id, localStorage.token)
      .then((userForDelete) => {
        const newUsers = users.filter((elem) => elem._id === user._id ? null : userForDelete);
        setUsers(newUsers);
      })
      .then(() => {
        handleInfoClick('Пользователь удален');
        setIsOpenPopupUserInfo(false);
      })
      .catch((err) => console.error(err));
  }

  //подписка на пользователя
  const handleUserFollowings = (userId, comand) => {
    let newFollowings = followings;

    if (comand) { //какую кнопку нажали 
      handleInfoClick('Вы успешно подписались')
      newFollowings.push(userId) //добавляем 
    } else {
      handleInfoClick('Вы отписались')
      newFollowings = followings.filter(id => id !== userId) //удаляем
    }

    api.userAddFollowing(newFollowings, currentUser._id, localStorage.token)
      .then((res) => {
        setFollowings(res)
      })
      .catch((err) => console.error(err));
  }

  //обновление аватара в настройках 
  const handleUpdateAvatar = (link) => {
    api.setAvatar(link, currentUser._id, localStorage.token)
      .then(res => {
        setCurrentUser(res);
      })
      .catch((err) => console.error(err));
  }

  //обновление ссылок соц сетей в настройках 
  const handleUpdateSocialLinks = (links) => {
    console.log(links)
    api.setSocialLinks(links, currentUser._id, localStorage.token)
      .then(res => {
        setCurrentUser(res);
      })
      .catch((err) => console.error(err));
  }

  //обновляем топ 10 
  function topRatingFilms(newUsers) {
    console.log('topRatingFilms')
    // console.log(films)

    if (films.length !== 0 && newUsers.length !== 0) {
      let newArr = films.map(film => {
        film.totalRange = 0;
        newUsers.forEach(user => {
          user.ratingFilms.forEach(ratingFilm => {
            if (film.name === ratingFilm.name) {
              //формула по которой определяется общий/топ рейтинг фильмов
              film.totalRange += ((11 - ratingFilm.position) * (user.ratingFilms.length / 10));
            }
          })
        })
        api.updateFilm(film) //обновляем фильм, точнее его рейтинг
        return film
      }
      )
      setFilms(newArr)
    }
  }

  //закрытие попапа щелчком вне формы
  React.useEffect(() => {
    const handleMouseClose = (evt) => {
      if (evt.target.classList.contains("infoTooltip_opened")) closePopupInfo();
    }
    document.addEventListener("mousedown", handleMouseClose);
    return () => document.removeEventListener("mousedown", handleMouseClose);
  }, []);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <NavBar
          notCheckedFilms={notCheckedFilms}
          onLogin={handleLoginClick}
          onSignOut={onSignOut}
          loggedIn={loggedIn}
          currentUser={currentUser}
          followings={followings}
          isUserAdmin={isUserAdmin}
        />

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
          pathname={pathname}
        />
        <PopupUserInfo
          isOpen={isOpenPopupUserInfo}
          onClose={closePopups}
          onChangePopup={handlePopupUserInfoClick}
          userCardChecking={userCardChecking}
          onRemoveUser={handleRemoveUser}
        />
        <InfoTooltip
          isOpen={isOpenPopupInfo}
          onClose={closePopupInfo}
          infoTooltip={infoTooltip}
          isAdmin={isAdmin}
          onChangeSection={handleChangeSectionPopupAdd}
          numberSection={numberSectionPopupAddCard}
          isOpenPopupAddCard={isOpenPopupAddCard}
          isOpenLogin={handleLoginClick}
        />
        <Header />

        <Main
          onAddFilm={addFilmHandler}
          films={films}
          users={users}
          onRemoveFilm={handleRemoveFilm}
          onEditFilm={editFilmHandler}
          onOpenPopupAddCard={handlePopupAddCardClick}
          onOpenPopupUserInfo={handlePopupUserInfoClick}
          ratingCards={ratingCards}
          notCheckedFilms={notCheckedFilms}
          onRemoveRatingCard={handleRemoveRatingCard}
          onUpRatingCard={handleUpRatingCard}
          onDownRatingCard={handleDownRatingCard}
          handleGetFilms={handleGetFilms}
          pathname={pathname}
          currentUser={currentUser}
          loggedIn={loggedIn}
          isOpenLogin={handleLoginClick}
          onUserFollowings={handleUserFollowings}
          followings={followings}
          onUpdateAvatar={handleUpdateAvatar}
          onUpdateSocialLinks={handleUpdateSocialLinks}
          isUserAdmin={isUserAdmin}
          isLoading={isLoading}
          onInfoTooltip={handleInfoClick}
        />

        <InfoBlock
          loggedIn={loggedIn}
          onSignOut={onSignOut}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;



  //получаем текущего юзера и его карточки рейтинга
  // const handleGetCurrentUser = useCallback(() => {
  //   console.log('handleGetCurrentUser')
  //   auth.getContent(localStorage.token) //, api.getFilms(localStorage.token)
  //     .then(res => {
  //       console.log(res)
  //       setCurrentUser(res);
  //       res.ratingFilms && setRatingCards(res.ratingFilms);  //забираем рейтинг фильмов
  //       setFollowings(res.followings)  //забираем подписки
  //       checkingAdminByEmail(res.email) //проверяем админ или нет
  //     })
  //     .catch((err) => console.error(err));
  // }, [history]);

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