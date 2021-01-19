import React from 'react';
import './Search.css';
import FilmsItem from '../Films/FilmsItem'

function Search({ films }) {
  const [value, setValue] = React.useState('');
  const [valueRes, setValueRes] = React.useState([]);
  // const [show, setShow] = React.useState(true);


  function handleChangeInput(e) {
    setValue(e.target.value);
    setValueRes(
      films.filter(elem =>
        elem.name.toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    )
    !e.target.value && setValueRes([])
    // console.log(valueRes)
    //setValueRes('Нет фильмов с таким названием')

  }

  function handleSubmit(e) {
    e.preventDefault();

    //setShow(true);
  }

  return (
    <div className="search">
      <h1 className="search__title">Поиск</h1>
      {/* <form onSubmit={handleSubmit}> */}
      <input type="text" className="search__input" name="inputSearch" value={value} onChange={handleChangeInput} />
      <button type="submit" className="search__button" onClick={handleSubmit}>Найти</button>
      {/* </form> */}
      {/* <p className="search__text" >{show ? valueRes : ''}</p> */}

      <div className="search__result-list">
        {
          valueRes.map(elem =>
            <FilmsItem
              item={elem}
              key={elem.id}
              ratingCards={valueRes}
            // onRemoveRatingCard={onRemoveRatingCard}
            // onUpRatingCard={onUpRatingCard}
            // onDownRatingCard={onDownRatingCard}
            />
          )
        }
      </div>
    </div>
  );
}

export default Search;
