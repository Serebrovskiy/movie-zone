import React from 'react';
import './ReviewItem.css';
import { Link, useRouteMatch } from 'react-router-dom';

function ReviewItem({ item }) {

    const { url } = useRouteMatch();

    return (
        <div className="review-item">
            <Link to={`${url}/${item.id}`} style={{ textDecoration: 'none' }}>
                <h2 className="review-item__title">{item.title}</h2>
            </Link>
            <div className="review-item__container">
                <img className="review-item__image" src={item.link[0]} alt="" />
                <div className="review-item__container-text">
                    <p className="review-item__text">{item.textPreview}</p>
                    <Link to={`${url}/${item.id}`} style={{ textDecoration: 'none' }}>
                        <button className="review-item__button-link">Подробнее</button>
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default ReviewItem;