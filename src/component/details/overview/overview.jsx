import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './overview.scss';
import Loader from '../../loader/loader';
const Overview = (props) => {
  const [items, setItems] = useState([]);

  const { loading = null, movieDetails } = props.list;

  useEffect(() => {
    const detailItems = [
      {
        id: 0,
        name: 'Tagline',
        value: 'Part of the journey is the end'
      },
      {
        id: 1,
        name: 'Budget',
        value: `${numberFormatter(356000000, 1)}`
      },
      {
        id: 2,
        name: 'Revenue',
        value: `${numberFormatter(2800000000, 1)}`
      },
      {
        id: 3,
        name: 'Status',
        value: 'Released'
      },
      {
        id: 4,
        name: 'Release Date',
        value: '2019-04-24'
      },
      {
        id: 5,
        name: 'Run Time',
        value: '181 min'
      }
    ];
    setItems(detailItems);

    // eslint-disable-next-line
  }, []);

  const numberFormatter = (number, digits) => {
    const symbolArray = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'B' }
    ];
    const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let result = '';

    for (let i = 0; i < symbolArray.length; i++) {
      if (number >= symbolArray[i].value) {
        result = (number / symbolArray[i].value).toFixed(digits).replace(regex, '$1') + symbolArray[i].symbol;
      }
    }
    return result;
  };

  return (
    <>
      {loading ? (
        <div className="loder-wrapper">
          <Loader />
        </div>
      ) : (
        <div className="overview">
          <div className="overview-column-1">
            <div className="description">This is a description about the movie</div>

            <div className="cast">
              <div className="div-title">Cast</div>
              <div>
                {movieDetails[1]?.data.cast.map((data) => (
                  <div key={`${data.cast_id}-${data.id}`}>
                    <div>
                      <img src={data.profile_path ? `https://image.tmdb.org/t/p/w500${data.profile_path}` : 'http://placehold.it/54x81'} alt="" />
                    </div>
                    <div>
                      <p>{data.name}</p>
                      <p>{data.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="overview-column-2">
            <div className="overview-detail">
              <h6>Production Companies</h6>
              {movieDetails[0]?.data.production_companies.map((prod) => (
                <div className="product-company" key={prod.logo_path}>
                  <img src={prod.logo_path ? `https://image.tmdb.org/t/p/w500${prod.logo_path}` : 'http://placehold.it/30x30'} alt="" />
                  <span>{prod.name}</span>
                </div>
              ))}
            </div>
            <div className="overview-detail">
              <h6>Language(s)</h6>
              <p>
                {movieDetails[0]?.data.spoken_languages.map((language) => (
                  <a href="!#" key={language.name}>
                    {language.name}
                  </a>
                ))}
              </p>
            </div>
            {items.map((data) => (
              <div className="overview-detail" key={data.id}>
                <h6>{data.name}</h6>
                <p>
                  <a href="!#">{data.value}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ movie }) => ({
  list: movie
});

Overview.propTypes = {
  list: PropTypes.any.isRequired
};

export default connect(mapStateToProps, null)(Overview);
