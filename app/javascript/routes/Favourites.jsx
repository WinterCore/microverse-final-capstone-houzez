import React from 'react';

import FavouritesGrid from '../components/FavouritesGrid';

import utilStyle from '../utility.module.css';

const Index = () => (
  <div>
    <h1 className={utilStyle.heading}>Your Favourites</h1>
    <FavouritesGrid />
  </div>
);

export default Index;
