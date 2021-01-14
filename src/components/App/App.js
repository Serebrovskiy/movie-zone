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
  const [ratingFilms, setRatingFilms] = useState([]);
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
    console.log(ratingFilms)
  }, [ratingFilms])

  const addRatingFilmsHandler = ({
    name,
    link,
    position,
    id
  }) => {
    const newRatingFilms = {
      name,
      link,
      position,
      id: Date.now()
    };
    setRatingFilms((prev) => [...prev, newRatingFilms]);
    console.log(newRatingFilms)
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

  const onRemovePremier = (premier) => {
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
        onAddRatingFilms={addRatingFilmsHandler}
      />
      <Header />
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Main
            onAddPremieres={addPremieresHandler}
            premieres={premieres}
            onRemovePremier={onRemovePremier}
            onOpenPopupRating={handlePopupRatingClick}
            ratingFilms={ratingFilms}
          />
        </Switch>
        <InfoBlock />
      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;


