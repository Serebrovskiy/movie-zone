import React, { useState, useEffect } from "react";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import InfoBlock from '../InfoBlock/InfoBlock'
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [premieres, setPremieres] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('premieres') || '[]');
    setPremieres(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('premieres', JSON.stringify(premieres))
    console.log(premieres)
  }, [premieres])

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

      <Header />
      <BrowserRouter>
        <NavBar />
        <Main
          onAddPremieres={addPremieresHandler}
          premieres={premieres}
          onRemovePremier={onRemovePremier}
        />
        <InfoBlock />
      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;


