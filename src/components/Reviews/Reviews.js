import React from 'react';
import ReviewItem from './ReviewItem';
import './Reviews.css';

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
