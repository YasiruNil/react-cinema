import React from 'react';
import PropTypes from 'prop-types';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const Slide = ({ images }) => {
  const options = {
    type: 'loop',
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    rewind: true
  };
  return (
    <Splide aria-label="My Favorite Images" options={options}>
      {images.map((item, id) => {
        return (
          <SplideSlide key={`${id}-${item.url}`}>
            <img src={item.url} alt={item.alt} />
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

Slide.propTypes = {
  images: PropTypes.array.isRequired
};

export default Slide;
