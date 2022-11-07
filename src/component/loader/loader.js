import React from 'react';
import './loader.scss';

function Loader() {
  return (
    <div className="loading-wrapper">
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
