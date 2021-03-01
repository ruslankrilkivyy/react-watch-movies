import React from 'react';

import starSvg from '../assets/images/star.svg';

const MovieBlock = ({ items }) => {
  return (
    <div className="movies-block">
      {items &&
        items.map(({ name, id, imageUrl, rating, year }) => (
          <div key={id} className="movies-block__item">
            <div className="movies-block__item-img">
              <img src={imageUrl} alt="movies img" />
            </div>
            <div className="movies-block__item-info">
              <div className="movies-block__item-info-top">
                <h4>{name}</h4>
              </div>
              <div className="movies-block__item-info-bottom">
                <span>{year}</span>
                <div className="movies-block__item-info-rating">
                  <img src={starSvg} alt="star svg" />
                  <b>{rating}</b>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MovieBlock;