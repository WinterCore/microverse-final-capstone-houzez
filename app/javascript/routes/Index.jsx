import React from 'react';

import HousesGrid from '../components/HousesGrid';
import Filter from '../components/Filter';

import utilStyle from '../utility.module.css';

const Index = () => (
  <div>
    <h1 className={utilStyle.heading}>Houses</h1>
    <Filter />
    <HousesGrid />
  </div>
);

export default Index;
