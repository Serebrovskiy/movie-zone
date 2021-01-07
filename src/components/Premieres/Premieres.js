import React from 'react';
import './Premieres.css';
import PremieresItem from './PremieresItem';


function Premieres({ data, premieres, onRemovePremier }) {

  return (
    <div className="premieres">
      <h1 className="premieres__title">Скоро в кино</h1>
      <div className="premieres__container">
        {
          // data.map(elem =>
          //   <PremieresItem
          //     item={elem}
          //     key={elem.id}
          //   />
          // )
          premieres.map(elem =>
            <PremieresItem
              item={elem}
              key={elem.id}
              onRemovePremier={onRemovePremier}
            />
          ).reverse()

        }
      </div>
    </div>
  );
}

export default Premieres;
