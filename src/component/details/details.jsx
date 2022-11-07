import React, { useEffect } from 'react';
import './details.scss';
import { connect } from 'react-redux';
import Rating from '../rating/rating';
import { PropTypes } from 'prop-types';
import { fetchMovieDetails } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import Loader from '../loader/loader';
import Tabs from './tabs/tabs';
import Overview from './overview/overview';
import Crew from './crew/crew';
import Media from './media/media';
import Reviews from './reviews/reviews';

const Details = (props) => {
  const params = useParams();
  useEffect(() => {
    if (params && params.id) {
      props.fetchMovieDetails(params.id);
    }
  }, []);
  const { loading = null, movieDetails } = props.list;
  return (
    <>
      {loading ? (
        <div className="loder-wrapper">
          <Loader />
        </div>
      ) : (
        <div className="movie-container">
          <div className="movie-bg" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails[0]?.data.backdrop_path})` }}></div>
          <div className="movie-overlay"></div>
          <div className="movie-details">
            <div className="movie-image">
              <img src={`https://image.tmdb.org/t/p/w500${movieDetails[0]?.data.backdrop_path}`} alt={movieDetails[0]?.data.original_title} />
            </div>
            <div className="movie-body">
              <div className="movie-overview">
                <div className="title">
                  {movieDetails[0]?.data.title} <span>{movieDetails[0]?.data.release_date}</span>
                </div>
                <div className="movie-genres">
                  <ul className="genres">
                    {movieDetails[0]?.data.genres.map((item) => {
                      return <li key={item.id}>{item.name}</li>;
                    })}
                  </ul>
                </div>
                <div className="rating">
                  <Rating rating={movieDetails[0]?.data.vote_average || 0} totalStars={10} />
                  <span>{movieDetails[0]?.data.vote_average}</span>
                  <p>({movieDetails[0]?.data.vote_count}) reviews</p>
                </div>
                <Tabs>
                  <div label="Overview">
                    <Overview />
                  </div>
                  <div label="Crew">
                    <Crew />
                  </div>
                  <div label="Media">
                    <Media />
                  </div>
                  <div label="Reviews">
                    <Reviews />
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieDetails: (data) => dispatch(fetchMovieDetails(data))
  };
};

const mapStateToProps = ({ movie }) => ({
  list: movie
});

Details.propTypes = {
  list: PropTypes.any.isRequired,
  fetchMovieDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
