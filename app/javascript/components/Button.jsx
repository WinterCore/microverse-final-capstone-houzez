import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.css';

const Button = ({ children, onClick, disabled }) => {
  return (
    <button className={classnames(styles.button, styles.filled)} onClick={onClick} disabled={disabled}>{children}</button>
  );
};

Button.defaultProps = {
  onClick: () => null,
  disabled: false,
};

export default Button;
