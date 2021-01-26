import React from 'react';
import './Search.css';
import FilmsItem from '../Films/FilmsItem'

function Search({ films }) {
  const [value, setValue] = React.useState('');
  const [valueRes, setValueRes] = React.useState([]);

  function handleChangeInput(e) {
    setValue(e.target.value);
    setValueRes(
      films.filter(elem =>
        (e.target.value.length > 2) &&  //выводим результат начиная с 3ей буквы
        elem.name.toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    )
    !e.target.value && setValueRes([])
    //setValueRes('Нет фильмов с таким названием')
  }

  function handleSubmit(e) {
    e.preventDefault();

  }

  return (
    <div className="search">
      <h1 className="search__title">Поиск</h1>
      <input type="text" className="search__input" name="inputSearch" value={value} onChange={handleChangeInput} />
      <button type="button" className="search__button" onClick={handleSubmit}>Найти</button>
      <div className="search__result-list">
        {
          valueRes.map(elem =>
            <FilmsItem
              item={elem}
              key={elem.id}
            />
          )
        }
      </div>
    </div>
  );
}

export default Search;
