import React from 'react';
import './grid.scss';
import PropTypes from 'prop-types';
import Rating from '../rating/rating';
import LazyImage from '../lazyImage/lazyImage';

const Grid = ({ images }) => {
  return (
    <div className="grid">
      {images &&
        images.map((item, id) => {
          return (
            <LazyImage key={`${item.id}-${id}`} className="grid-cell" src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} alt={item.original_title}>
              <div className="grid-read-more">
                <button className="grid-cell-button">Read more</button>
              </div>
              <div className="grid-detail">
                <span className="grid-details-title">{item.title}</span>
                <div className="grid-details-rating">
                  <Rating rating={item.vote_average} totalStars={10} />
                  <div className="grid-vote-average">{item.vote_average}</div>
                </div>
              </div>
            </LazyImage>
          );
        })}
    </div>
  );
};
Grid.propTypes = {
  images: PropTypes.array.isRequired
};
export default Grid;
