import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Loader from '../containers/Loader';
import styles from './Button.module.css';
import utilStyles from '../utility.module.css';

const Button = ({ children, onClick, disabled, loading, fullWidth, flat }) => {
  return (
    <button
      className={classnames(styles.button, styles.filled, { [styles.fullWidth]: fullWidth, [styles.flat]: flat})}
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
  className: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  flat: PropTypes.bool.isRequired,
};

Button.defaultProps = {
  onClick: () => null,
  disabled: false,
  loading: false,
  className: '',
  fullWidth: false,
  flat: false,
};

export default Button;
