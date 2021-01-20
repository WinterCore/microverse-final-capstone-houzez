import React from 'react';
import PropTypes from 'prop-types';

import HouseComponent from '../components/House';

const House = ({ match }) => {
    return <HouseComponent houseId={ +match.params.id } />;
};

export default House;
