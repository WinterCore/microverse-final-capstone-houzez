import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useSnackbar } from 'notistack';

import { logout } from '../store/user/actions';
import * as CustomPropTypes from '../common-prop-types';

import style from './Header.module.css';
import utilStyle from '../utility.module.css';

const Header = ({
  user, logoutUser, history, handleSidenavToggle,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDropdownMouseEnter = () => setIsDropdownOpen(true);
  const handleDropdownMouseLeave = () => setIsDropdownOpen(false);

  const handleLogoutClick = () => {
    logoutUser();
    history.push('/login');
    enqueueSnackbar('Logged out successfully!', { variant: 'success' });
  };

  return (
    <header>
      <div>
        <div className={style.hamburger} onClick={handleSidenavToggle}>
          <span className="material-icons">
            menu
          </span>
        </div>
        <nav>
          <Link to="/">Houses</Link>
          <Link to="/favourites">Favourites</Link>
        </nav>
      </div>
      <div className={classnames(utilStyle.flex, utilStyle.alignCenter)}>
        <div className={style.nameDropdown} onMouseEnter={handleDropdownMouseEnter} onMouseLeave={handleDropdownMouseLeave}>
          { user.name }
          <div className={classnames(style.dropdownContainer, { [style.shown]: isDropdownOpen })}>
            <div className={style.dropdownOption} onClick={handleLogoutClick}>Logout</div>
          </div>
        </div>
        <div className={style.profilePicture}>
          <img src={user.picture} referrerPolicy="no-referrer" />
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({ user: state.user.user });
const mapDispatchToProps = dispatch => bindActionCreators({ logoutUser: logout }, dispatch);

Header.propTypes = {
  user: PropTypes.shape(CustomPropTypes.user).isRequired,
  logoutUser: PropTypes.func.isRequired,
  handleSidenavToggle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
