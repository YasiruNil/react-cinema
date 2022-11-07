import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './media.scss';
import Loader from '../../loader/loader';

const Media = (props) => {
  const { loading = null, movieDetails } = props.list;
  return (
    <>
      {loading ? (
        <div className="loder-wrapper">
          <Loader />
        </div>
      ) : (
        <div className="media">
          <div>
            <div className="media-title">Watch Trailer</div>
            <div className="media-videos">
              {movieDetails[3]?.data?.results.map((data) => (
                <div className="video" key={data.key}>
                  <iframe
                    title="Avengers"
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                    src={`https://www.youtube.com/embed/${data.key}`}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="media-title">Photos ({movieDetails[2]?.data?.posters.length})</div>
            <div className="media-images">
              {movieDetails[2]?.data.posters.map((data, i) => (
                <div
                  key={i}
                  className="image-cell"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${data?.file_path})`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
Media.propTypes = {
  list: PropTypes.any.isRequired
};

const mapStateToProps = ({ movie }) => ({
  list: movie
});

export default connect(mapStateToProps, null)(Media);
