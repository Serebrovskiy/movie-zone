import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import InfoBlock from '../InfoBlock/InfoBlock'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Header />
      <BrowserRouter>
        <NavBar />
        <Main />
        <InfoBlock />
      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;


