import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../component/header/header';

const DefaultLayOut = () => {
  return (
    <section className="layout">
      <aside className="sidebar" />
      <section>
        <Header/>
        <main>
          <Outlet />
        </main>
        <footer />
      </section>
    </section>
  );
};

export default DefaultLayOut;
