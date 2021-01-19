import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Loader from '../containers/Loader';
import styles from './Button.module.css';
import utilStyles from '../utility.module.css';

const Button = ({ children, onClick, disabled, loading }) => {
  return (
    <button
      className={classnames(styles.button, styles.filled)}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {children}
      {loading && <Loader width="20px" color="#FFF" className={ utilStyles.ml2 } />}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

Button.defaultProps = {
  onClick: () => null,
  disabled: false,
  loading: false,
};

export default Button;
