import React from 'react';
import './App.css';
import Header from'./Header';
import Main from'./Main';
import Footer from'./Footer';
// import NavBar from './NavBar';
// import InfoBlock from './InfoBlock'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">

  

      {/* <NavBar /> */}
      <Header />
      <BrowserRouter>
      <Main />
      </BrowserRouter>
      <Footer />
      {/* <InfoBlock /> */}
     
      

    </div>
  );
}

export default App;


