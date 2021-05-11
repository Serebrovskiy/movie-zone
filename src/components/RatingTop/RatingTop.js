import React from 'react';
import RatingCard from '../Rating/RatingCard'
import './RatingTop.css';

function RatingTop({
  ratingCards,
  pathname,
  films
}) {
  return (
    <div className="rating-top">
      <p className="rating-top__text">ТОП-10  фильмов</p>
      <div className="rating-top__container">
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
                pathname={pathname}
              />
            )
            .slice(0, 10)
        }
      </div>
    </div>
  );
}

export default RatingTop;
