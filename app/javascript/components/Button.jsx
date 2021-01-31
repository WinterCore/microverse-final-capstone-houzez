import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Loader from '../containers/Loader';
import styles from './Button.module.css';
import utilStyles from '../utility.module.css';

const Button = ({
  children, onClick, disabled, loading, fullWidth, flat, className,
}) => (
  <button
    className={
      classnames(
        styles.button,
        styles.filled,
        { [styles.fullWidth]: fullWidth, [styles.flat]: flat },
        className,
      )
    }
    onClick={e => !disabled && onClick(e)}
    disabled={disabled || loading}
    type="button"
  >
    {children}
    {loading && <Loader width="20px" color="#FFF" className={utilStyles.ml2} />}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  flat: PropTypes.bool,
  children: PropTypes.node.isRequired,
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
