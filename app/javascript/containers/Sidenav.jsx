import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { logout } from '../store/user/actions';
import { user } from '../common-prop-types';

import style from './Sidenav.module.css';
import utilStyle from '../utility.module.css';

const Sidenav = ({
  user, isOpen, location: { pathname }, logout,
}) => (
  <div className={classnames(style.sidenav, { [style.open]: isOpen })}>
    <div>
      <div className={style.userInfo}>
        <img src={user.picture} alt={user.name} />
        <div className={style.name}>{user.name}</div>
        <div className={style.email}>{user.email}</div>
      </div>
      <div className={style.links}>
        <Link
          className={classnames({ [style.active]: pathname === '/' }, style.link)}
          to="/"
        >
          <span className="material-icons">
            home
          </span>
          Houses
        </Link>
        <Link
          className={classnames({ [style.active]: pathname === '/favourites' }, style.link)}
          to="/favourites"
        >
          <span className="material-icons">
            favorite
          </span>
          Favourites
        </Link>
      </div>
    </div>
    <div>
      <button
        className={classnames(style.link, utilStyle.bland)}
        type="button"
        onClick={logout}
      >
        <span className="material-icons">
          power_settings_new
        </span>
        Logout
      </button>
    </div>
  </div>
);

const mapStateToProps = state => state.user;
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

Sidenav.propTypes = {
  user: PropTypes.shape(user).isRequired,
  isOpen: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidenav));
