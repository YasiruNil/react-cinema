import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../assets/images/giphy.gif';

const LazyImage = (props) => {
  const [imageSrc, setImageSrc] = useState(Loader);
  const [imageRef, setImageRef] = useState();
  const { src, alt, children, className } = props;
  useEffect(() => {
    let observer;
    let didCancel = false;
    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if ((!didCancel && entry.intersectionRatio > 0) || entry.isIntersecting) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%'
          }
        );
        observer.observe(imageRef);
      } else {
        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageRef, imageSrc]);
  return (
    <div className={className} ref={setImageRef} style={{ backgroundImage: `url(${imageSrc})` }} alt={alt}>
      {children}
    </div>
  );
};

LazyImage.propTypes = {
  children: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

export default LazyImage;
