import React from 'react';
import { Outlet } from 'react-router-dom';

const SecondaryLayout = () => {
  return (
    <section className="layout">
      <aside className="right-panel">
        <h2>hey new stuff</h2>
        <main> <Outlet /></main>
      </aside>
    </section>
  );
};

export default SecondaryLayout;
