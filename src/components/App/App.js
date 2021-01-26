import React, { useState, useEffect } from "react";
import { Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import InfoBlock from '../InfoBlock/InfoBlock'
import PopupAddCard from '../PopupAddCard/PopupAddCard'


function App() {
  const [films, setFilms] = useState([]);
  const [ratingCards, setRatingCards] = useState([]);
  const [notCheckedFilms, setNotCheckedFilms] = useState([]);
  const [cardChecking, setCardChecking] = useState(null);
  const [isOpenPopupAddCard, setIsOpenPopupAddCard] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  //открываем попап и определяем кто это дедает
  function handlePopupAddCardClick(isAdminOpened, card) {
    setIsOpenPopupAddCard(true);
    setIsAdmin(isAdminOpened);
    card && setCardChecking(card)
  }

  function closePopups() {
    setIsOpenPopupAddCard(false);
    setCardChecking(null)
  }

  //добавление карточки рейтинга
  const addRatingCardsHandler = ({
    name,
    link,
    position,
    id
  }) => {
    const newRatingCards = {
      name,
      link,
      position,
      id: Date.now()    //уникальный id
    };

    console.log(name)
    //заглушка для картинки
    if (newRatingCards.link === '') newRatingCards.link = "https://www.startfilm.ru/images/base/film/31_03_12/big_86561_15636.jpg"

    //кастомный метод для вставки элемента в любую часть массива
    const insert = (arr, index, newItem) => [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index)
    ];

    setRatingCards(
      insert(ratingCards, position - 1, newRatingCards)
        .map((elem, index) => {
          elem.position = index + 1;   //упорядочиваем нумерацию карточек 
          return elem;
        })
    )

    console.log(newRatingCards)
  }

  //удаление карточки рейтинга
  const handleRemoveRatingCard = (card) => {
    console.log(card)
    setRatingCards(ratingCards
      .filter(elem => elem.name !== card.name) //раньше было по id, но имя тоже уникальное
      .map((elem, index) => {
        elem.position = index + 1;   //упорядочиваем нумерацию карточек 
        return elem;
      })
    )
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

    setRatingCards(templeFun(ratingCards)
      .map((elem, index) => {
        elem.position = index + 1;   //упорядочиваем нумерацию карточек 
        return elem;
      }))
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

    setRatingCards(templeFun(ratingCards)
      .map((elem, index) => {
        elem.position = index + 1;   //упорядочиваем нумерацию карточек 
        return elem;
      }))
  }

  const addFilmHandler = ({
    name,
    link,
    date,
    genre,
    country,
    director,
    cast,
    checked,
    id
  }) => {
    const newFilm = {
      name,
      link,
      date,
      genre,
      country,
      director,
      cast,
      checked,
      id: films.length  //???
    };
    setFilms((prev) => [...prev, newFilm]);
    console.log(newFilm)
  }

  const handleRemoveFilm = (film) => {
    setFilms(
      films
        .filter(elem => film.id !== elem.id)
        .map(function (elem, index) {
          elem.id = index;
          return elem;
        }));
  }

  //обновляем/одобряем фильм
  const editFilmHandler = (card, remove) => {
    //если админ нажал "отклонить" удаляем из коллекции и из рейтинга
    if (remove) {
      handleRemoveFilm(card);
      handleRemoveRatingCard(card);
      closePopups();
    } else {
      setFilms(films.map((elem, index) => {
        if (elem.name === card.name) {
          card.id = index;
          return card
        } else {
          return elem
        };
      }))
    }
    setCardChecking(null)
  }

  useEffect(() => {
    const savedFilms = JSON.parse(localStorage.getItem('films') || '[]');
    setFilms(savedFilms
      .sort(() => Math.random() - 0.5)
      .map((elem, index) => {
        elem.id = index;      //переопределяем id элемента в соотвествии с его индексом
        return elem
      }));
    const savedRatingCards = JSON.parse(localStorage.getItem('ratingCards') || '[]');
    setRatingCards(savedRatingCards);
  }, [])

  useEffect(() => {
    setNotCheckedFilms(films.filter(elem => !elem.checked))  //определяем непроверенные фильмы 
    localStorage.setItem('films', JSON.stringify(films));
    console.log(films)
  }, [films])

  useEffect(() => {
    localStorage.setItem('ratingCards', JSON.stringify(ratingCards));
    console.log(ratingCards)
  }, [ratingCards])

  return (
    <div className="App">
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
      />
      <Header />
      <BrowserRouter>
        <NavBar />
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
          />
        </Switch>
        <InfoBlock />
      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;


