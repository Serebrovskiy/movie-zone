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
  const [premieres, setPremieres] = useState([]);
  const [ratingCards, setRatingCards] = useState([]);
  const [isOpenPopupRating, setIsOpenPopupRating] = useState(false);

  function handlePopupRatingClick() {
    setIsOpenPopupRating(true);
  }

  function closePopups() {
    setIsOpenPopupRating(false);
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('premieres') || '[]');
    setPremieres(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('premieres', JSON.stringify(premieres))
    console.log(premieres)
  }, [premieres])

  useEffect(() => {
    console.log(ratingCards)
    // setRatingCards(ratingCards.map((elem, index) => {
    //   elem.position = index + 1;  
    //   return elem;
    // }))
  }, [ratingCards])

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
      id: Date.now()
    };

    //заглушка для картинки
    if (newRatingCards.link === '') newRatingCards.link = "https://www.startfilm.ru/images/base/film/31_03_12/big_86561_15636.jpg"

    //кастомный метод по вставки элемента в любую часть массива
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
    setRatingCards(ratingCards
      .filter(elem => elem.id !== card.id)
      .map((elem, index) => {
        elem.position = index + 1;   //упорядочиваем нумерацию карточек 
        return elem;
      })
    )
  }

  const addPremieresHandler = ({
    name,
    link,
    date,
    genre,
    country,
    director,
    cast,
    id
  }) => {
    const newPremieres = {
      name,
      link,
      date,
      genre,
      country,
      director,
      cast,
      id: premieres.length
    };
    setPremieres((prev) => [...prev, newPremieres]);
    console.log(newPremieres)
  }

  const handleRemovePremier = (premier) => {
    setPremieres(
      premieres
        .filter(elem => premier.id !== elem.id)
        .map(function (elem, index) {
          elem.id = index;
          return elem;
        }));
  }

  return (
    <div className="App">
      <PopupAddCard
        isOpen={isOpenPopupRating}
        onClose={closePopups}
        onAddRatingCards={addRatingCardsHandler}
        ratingCards={ratingCards}
      />
      <Header />
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Main
            onAddPremieres={addPremieresHandler}
            premieres={premieres}
            onRemovePremier={handleRemovePremier}
            onOpenPopupRating={handlePopupRatingClick}
            ratingCards={ratingCards}
            onRemoveRatingCard={handleRemoveRatingCard}
          />
        </Switch>
        <InfoBlock />
      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;


