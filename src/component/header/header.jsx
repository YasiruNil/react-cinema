import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { fetchMovies } from '../../redux/actions';
import { PropTypes } from 'prop-types';
import './header.scss';

const HEADER_LIST = [
  {
    id: 1,
    iconClass: 'fas fa-film',
    name: 'Now Playing',
    type: 'now_playing'
  },
  {
    id: 2,
    iconClass: 'fas fa-fire',
    name: 'Popular',
    type: 'popular'
  },
  {
    id: 3,
    iconClass: 'fas fa-star',
    name: 'Top Rated',
    type: 'top_rated'
  },
  {
    id: 4,
    iconClass: 'fas fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming'
  }
];

const Header = (props) => {
  const navigate = useNavigate();
  let [navClass, setNavClass] = useState(false);
  let [menuClass, setMenuClass] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleMenu = () => {
    menuClass = !menuClass;
    navClass = !navClass;
    setNavClass(navClass);
    setMenuClass(menuClass);
    if (navClass) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  };

  const handleClick = (e, MovieType) => {
    e.preventDefault();
    const data = { type: MovieType, page: 1 };
    console.log(data);
    if (!!searchParams.get('page') && !!searchParams.get('type')) {
      setSearchParams(data);
      props.fetchMoviesList(data);
    } else {
      navigate({
        pathname: '/',
        search: createSearchParams({
          type: MovieType,
          page: 1
        }).toString()
      });
    }
  };

  return (
    <>
      <div className="header-nav-wrapper">
        <div className="header-bar"></div>
        <div className="header-navbar">
          <div className="header-image">
            <img src="/icons/cinema-logo.svg" alt="" />
          </div>
          <div className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`} id="header-mobile-menu" onClick={() => toggleMenu()}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
            {HEADER_LIST.map((data) => (
              <li key={data.id} className="header-nav-item">
                <span className="header-list-name">
                  <i className={data.iconClass}></i>
                </span>
                &nbsp;
                <span className="header-list-name" onClick={(e) => handleClick(e, data.type)}>
                  {data.name}
                </span>
              </li>
            ))}
            <input className="search-input" type="text" placeholder="Search for a movie" />
          </ul>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMoviesList: (data) => dispatch(fetchMovies(data))
  };
};

Header.propTypes = {
  fetchMoviesList: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Header);
