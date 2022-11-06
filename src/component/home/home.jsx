import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import './home.scss';
import Grid from '../grid/grid';
import Paginates from '../paginates/paginates';
import { fetchMovies, loadMoreMovies } from '../../redux/actions';

import { PropTypes } from 'prop-types';

const HomePage = (props) => {
  // const [loadMore,set]
  const [searchParams, setSearchParams] = useSearchParams();
  const mainRef = useRef();
  const bottomLineRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (type) => {
    let changedPage = 0;
    console.log(currentPage, typeof currentPage);
    if (type === 'prev' && currentPage > 1) {
      changedPage = currentPage - 1;
    } else {
      changedPage = currentPage + 1;
    }
    setCurrentPage(changedPage);
    const movieType = searchParams.get('type');

    const data = { type: movieType, page: changedPage };
    setSearchParams(data);
    props.fetchMoviesList(data);
  };
  const images = [
    { url: '/images/naruto.jpeg', alt: 'img-01', rating: 7.5 },
    { url: '/images/av.jpeg', alt: 'img-02', rating: 10 },
    { url: '/images/naruto.jpeg', alt: 'img-03', rating: 5.5 },
    { url: '/images/av.jpeg', alt: 'img-04', rating: 3 }
  ];

  const Slide = Loadable({
    loader: () => import('../slide/slide'),
    loading() {
      return <div>Loading...</div>;
    },
    delay: '2000'
  });

  const fetchMoreData = () => {
    if (props.list?.page < props.list?.totalPages) {
      setCurrentPage((prev) => prev + 1);
      const movieType = searchParams.get('type');
      const data = { type: movieType, page: props.list?.page + 1 };
      props.loadMoreMovies(data);
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect()?.bottom;
    const { top: bottomRef } = bottomLineRef.current.getBoundingClientRect();
    if (Math.trunc(bottomRef) <= containerHeight) {
      fetchMoreData();
    }
  };

  useEffect(() => {
    let page = 1;
    let type = 'now_playing';
    if (!!searchParams.get('page') && !!searchParams.get('type')) {
      page = searchParams.get('page');
      type = searchParams.get('type');
    } else {
      setSearchParams({ type, page });
    }
    const data = { type, page };
    const connverToNumber = Number(page);
    setCurrentPage(connverToNumber);
    props.fetchMoviesList(data);
  }, []);

  useEffect(() => {
    const convertedToumber = Number(searchParams.get('page'));
    if (convertedToumber !== currentPage) {
      setCurrentPage(convertedToumber);
    }
  }, [searchParams.get('page')]);

  return (
    <div className="main-content" ref={mainRef} onScroll={() => handleScroll()}>
      <section>
        <Slide images={images} />
      </section>
      <section>
        <div className="grid-movie-title">
          <div className="movie-type">Now playing</div>
          <div className="paginate">
            <Paginates paginate={paginate} totalPages={props.list?.totalPages || 1} currentPage={currentPage} />
          </div>
        </div>
      </section>
      <section className="grid-padding">
        {!props.list.loading ? (
          <Grid images={props.list.movieList || []} />
        ) : (
          <div className="loading-wrapper">
            <div className="loading">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </section>
      <div ref={bottomLineRef}></div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMoviesList: (data) => dispatch(fetchMovies(data)),
    loadMoreMovies: (data) => dispatch(loadMoreMovies(data))
  };
};

const mapStateToProps = ({ movie }) => ({
  list: movie
});

HomePage.propTypes = {
  fetchMoviesList: PropTypes.func.isRequired,
  list: PropTypes.any.isRequired,
  loadMoreMovies: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
