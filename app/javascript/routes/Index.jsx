import React from 'react';

import HousesGrid from '../components/HousesGrid';
import Filter from '../components/Filter';

const Index = () => {
    return (
        <div>
          <Filter />
          <HousesGrid />
        </div>
    );
};

export default Index;
