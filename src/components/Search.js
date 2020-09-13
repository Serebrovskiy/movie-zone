import React from 'react';
import './Search.css';

function Search() {
  const [value, setValue] = React.useState('');
  const [show, setShow] = React.useState(false);


  function handleChangeInput(e) {
    setValue(e.target.value);
    setShow(false);
  }

  function handleSubmit(e){
    e.preventDefault();

    setShow(true);
  }

  return (
    <div className="search">
      <h1 className="search__title">Поиск</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" className="search__input" name="inputSearch" value={value} onChange={handleChangeInput} />
        <button type="submit" className="search__button" onClick={handleSubmit}>Найти</button>
      </form>
      <p className="search__text" >{show ? value : ''}</p>
    </div>
  );
}

export default Search;
