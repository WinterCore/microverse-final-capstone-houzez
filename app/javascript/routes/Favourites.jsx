import React from 'react';

import FavouritesGrid from '../components/FavouritesGrid';

import utilStyle from '../utility.module.css';

const Index = () => (
  <section>
    <h1 className={utilStyle.heading}>Your Favourites</h1>
    <FavouritesGrid />
  </section>
);

export default Index;
