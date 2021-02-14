import React from 'react';
import './RatingTop.css';
import RatingCard from '../Rating/RatingCard'

function RatingTop({
  ratingCards,
  pathname,
  films
}) {

  // const [isReduceCards, setIsReduceCards] = React.useState(false); //сжатие карочек 

  // function handleReduceCards() {
  //   setIsReduceCards(!isReduceCards);
  // }

  console.log(films)

  return (
    <div className="rating-top">
      <p className="rating-top__text">ТОП-10  фильмов</p>
      <div className="rating-top__container">
        {/* <button className={`rating-top__button-reduce ${isReduceCards && "rating-top__button-reduce_active"}`} onClick={handleReduceCards} /> */}
      </div>
      <div className="rating-top__place">
        {
          films
            .sort(function (a, b) {
              return a.totalRange - b.totalRange;
            })
            .reverse()
            .map((elem, index) => {
              elem.position = index + 1;
              return elem
            })
            .map((elem, index) =>
              <RatingCard
                item={elem}
                key={elem.id}
                ratingCards={ratingCards}

                // isReduceCards={isReduceCards}
                pathname={pathname}
              />
              // <>
              //   <p>{elem.name}: {elem.totalRange.toFixed(1)}</p>
              // </>
            )
            .slice(0, 10)
        }

        {/* {
          ratingCards.length === 0
            ?
            <p className="rating-top__place-text" >В рейтинге еще нет фильмов в рейтинге</p>
            :
            ratingCards.map(elem =>
              <RatingCard
                item={elem}
                key={elem._id}
                ratingCards={ratingCards}

                isReduceCards={isReduceCards}
                pathname={pathname}
              />
            )
        } */}
      </div>
    </div>
  );
}

export default RatingTop;
