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
        <button
          type="button"
          className={classnames(style.hamburger, utilStyle.bland)}
          onClick={handleSidenavToggle}
        >
          <span className="material-icons">
            menu
          </span>
        </button>
        <nav>
          <Link to="/">Houses</Link>
          <Link to="/favourites">Favourites</Link>
        </nav>
      </div>
      <div className={classnames(utilStyle.flex, utilStyle.alignCenter)}>
        <div
          className={style.nameDropdown}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          { user.name }
          <div className={classnames(style.dropdownContainer, { [style.shown]: isDropdownOpen })}>
            <button
              className={classnames(style.dropdownOption, utilStyle.bland)}
              onClick={handleLogoutClick}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
        <div className={style.profilePicture}>
          <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" />
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
