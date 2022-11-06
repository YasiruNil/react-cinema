import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './paginates.scss';
import PropTypes from 'prop-types';

const Paginates = ({ currentPage, totalPages, paginate }) => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState();
  const [totalPageNumber, setTotalPageNumber] = useState();

  useEffect(() => {
    const pageParams = Number(searchParams.get('page'));
    setPage(pageParams);
    setTotalPageNumber(totalPages);
  }, [currentPage, totalPages, searchParams]);
  return (
    <>
      <span className="page-count">
        {page}-{totalPageNumber}
      </span>
      <button className={page > 1 ? 'paginate-button' : 'paginate-button disable'} disabled={page === 1} onClick={() => paginate('prev')}>
        Prev
      </button>
      <button className={page === totalPageNumber ? 'paginate-button disable' : 'paginate-button'} disabled={page === totalPageNumber} onClick={() => paginate('next')}>
        Next
      </button>
    </>
  );
};

Paginates.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default Paginates;
