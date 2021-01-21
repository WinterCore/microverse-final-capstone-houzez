import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../containers/Loader';

import utilStyles from '../utility.module.css';

const ApiResourceRenderer = ({
  isLoading, loaderWidth, error, empty, render,
}) => {
  if (error) {
    return <h2 className={utilStyles.errorHeading}>{error}</h2>;
  }

  if (isLoading) {
    return <Loader width={loaderWidth} />;
  }

  if (empty) {
    return <h2 className={utilStyles.infoHeading}>No items were found!</h2>;
  }

  return render();
};

ApiResourceRenderer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  empty: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
  loaderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ApiResourceRenderer;
