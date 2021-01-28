import React, { useState, useEffect } from "react";
import { Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import InfoBlock from '../InfoBlock/InfoBlock'
import PopupAddCard from '../PopupAddCard/PopupAddCard'
import InfoTooltip from '../InfoTooltip/InfoTooltip'


function App() {
  const [films, setFilms] = useState([]);
  const [ratingCards, setRatingCards] = useState([]);
  const [notCheckedFilms, setNotCheckedFilms] = useState([]);   //очень похожие названия
  const [cardChecking, setCardChecking] = useState(null);
  const [isOpenPopupAddCard, setIsOpenPopupAddCard] = useState(false);
  const [isOpenPopupInfo, setIsOpenPopupInfo] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState('');
  const [numberSectionPopupAddCard, setNumberSectionPopupAddCard] = useState(0);

  useEffect(() => {
    const savedFilms = JSON.parse(localStorage.getItem('films') || '[]');
    setFilms(savedFilms
      .sort(() => Math.random() - 0.5)
      .map((elem, index) => {
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

  //открываем попап и определяем кто это дедает
  function handlePopupAddCardClick(isAdminOpened, card) {
    setIsOpenPopupAddCard(true);
    setIsAdmin(isAdminOpened);
    card && setCardChecking(card) //если открывает админ, значит редактируем эту карточку
  }

  //попап с информацией 
  function handleInfoClick(message) {
    setIsOpenPopupInfo(true);
    setInfoTooltip(message);
  }

  function closePopups() {
    setIsOpenPopupAddCard(false);
    setIsOpenPopupInfo(false)
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

    setRatingCards(
      insert(ratingCards, position - 1, newRatingCard)
        .map((elem, index) => {
          elem.position = index + 1;   //упорядочиваем нумерацию карточек 
          (JSON.stringify(newRatingCard) === JSON.stringify(elem)) ? elem.new = true : elem.new = false; //ставим флаг для новой карточки
          return elem;
        })
    )
    //console.log(newRatingCard)
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

  //добавляем фильм в коллекцию
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
      />
      <Header />
      <BrowserRouter>
        <NavBar notCheckedFilms={notCheckedFilms} />
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