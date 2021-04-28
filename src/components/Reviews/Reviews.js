import React from 'react';
import './Reviews.css';
import ReviewItem from './ReviewItem';

// @FIXME Пример хорошо вложенной компоненты
function Reviews({ data }) {
  return (
    <div className="reviews">
      <h1 className="reviews__title">Новости кино</h1>
      {
        data.map(elem =>
          <ReviewItem
            item={elem}
            key={elem.id}
          />
        )
      }
    </div>
  );
}

export default Reviews;
