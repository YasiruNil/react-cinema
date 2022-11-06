import './notFound.scss';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import image from '../../assets/images/not.webp';

const NotFound = () => {
  const navigate = useNavigate();
  const reDirectUrl = () => {
    navigate('/');
  };
  return (
    <div className="errorPage">
      <h1>
        <code>Whoops! Something went wrong or you are lost...</code>
      </h1>
      <img alt="ok meme" className="memeImage" src={image} width="50%" height="50%" />

      <div>
        <button onClick={() => reDirectUrl()}>Home page</button>
      </div>
    </div>
  );
};

export default NotFound;
