import React from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {useSnackbar} from 'notistack';

import {logout} from '../store/user/actions';
import * as CustomPropTypes from '../common-prop-types';

import styles from './Header.module.css';
import utilStyles from '../utility.module.css';

const Header = ({ user, logoutUser, history }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const {enqueueSnackbar} = useSnackbar();

  const handleDropdownMouseEnter = () => setIsDropdownOpen(true);
  const handleDropdownMouseLeave = () => setIsDropdownOpen(false);

  const handleLogoutClick = () => {
    logoutUser();
    history.push('/login');
    enqueueSnackbar('Logged out successfully!', { variant: 'success' });
  };

  return (
    <header>
      <div className={styles.hamburger}></div>
      <div className={classnames(utilStyles.flex, utilStyles.alignCenter)}>
        <div className={styles.nameDropdown} onMouseEnter={ handleDropdownMouseEnter } onMouseLeave={handleDropdownMouseLeave}>
          { user.name }
          <div className={classnames(styles.dropdownContainer, { [styles.shown]: isDropdownOpen })}>
            <div className={styles.dropdownOption} onClick={ handleLogoutClick }>Logout</div>
          </div>
        </div>
        <div className={styles.profilePicture}>
          <img src={ user.picture } referrerPolicy="no-referrer" />
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({ user: state.user.user });
const mapDispatchToProps = (dispatch) => bindActionCreators({ logoutUser: logout }, dispatch);

Header.propTypes = {
  user: CustomPropTypes.user,
  logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
