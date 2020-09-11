import React from 'react';
import './PremieresItem.css';
import { Link, useRouteMatch } from 'react-router-dom';

function PremieresItem({ item }) {

  const { url } = useRouteMatch();

  return (
    <div className="premieres-item">
      <Link to={`${url}/${item.id}`} style={{textDecoration: 'none'}}>
        <img className="premieres-item__image" src={item.link} alt="" />
        <h3 className="premieres-item__name">{item.name}</h3>
        <p className="premieres-item__date">Дата выхода: {item.date}</p>
      </Link>
    </div>
  );
}

export default PremieresItem;
