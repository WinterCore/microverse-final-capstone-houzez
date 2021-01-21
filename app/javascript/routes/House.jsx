import React from 'react';
import PropTypes from 'prop-types';

import HouseComponent from '../components/House';

const House = ({ match }) => <HouseComponent houseId={+match.params.id} />;

House.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default House;
