import React from 'react';
import PropTypes from 'prop-types';

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
