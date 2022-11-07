import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './crew.scss';
import Loader from '../../loader/loader';

const Crew = (props) => {
  const { loading = null, movieDetails } = props.list;
  return (
    <>
      {loading ? (
        <div className="loder-wrapper">
          <Loader />
        </div>
      ) : (
        <div className="cast">
          <div className="div-title">Crew</div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th className="head">Department</th>
                <th className="head">Job</th>
              </tr>
            </thead>
            {movieDetails[1]?.data.crew.map((data) => (
              <tbody key={`${data.id} - ${data.credit_id}`}>
                <tr>
                  <td>
                    <img src={data.profile_path ? `https://image.tmdb.org/t/p/w500${movieDetails[0]?.data.profile_path}` : 'http://placehold.it/54x81'} alt="" />
                  </td>
                  <td>{data.name}</td>
                  <td>{data.department}</td>
                  <td>{data.job}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </>
  );
};

Crew.propTypes = {
  list: PropTypes.any.isRequired
};

const mapStateToProps = ({ movie }) => ({
  list: movie
});

export default connect(mapStateToProps, null)(Crew);
