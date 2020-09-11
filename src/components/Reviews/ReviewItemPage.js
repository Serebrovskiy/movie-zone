import React from 'react';
import './ReviewItemPage.css';
import { useParams, useHistory } from 'react-router-dom';

function ReviewItemPage({ data }) {

  let { id } = useParams();
  const history = useHistory();

  return (
    <div className="review-item-page">
      <button className="review-item-page__button-go-back" onClick={() => history.goBack()}>Назад</button>
      <h1 className="review-item-page__title">{data[id].title}</h1>
      <div className="review-item-page__container">
        <div className="review-item-page__container-image">
          {
            data[id].link.map(elem =>
              <img className="review-item-page__image" src={elem} alt="" />
            )
          }
        </div>
        <div className="review-item-page__container-text">
          {
            data[id].fullText.map(elem =>
              <p className="review-item-page__text">{elem}</p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default ReviewItemPage;
