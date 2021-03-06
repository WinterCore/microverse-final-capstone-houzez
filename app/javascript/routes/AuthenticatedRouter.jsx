import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from '../containers/Header';

import Index from './Index';
import House from './House';
import Favourites from './Favourites';
import Sidenav from '../containers/Sidenav';
import NotFound from '../containers/NotFound';

import utilStyle from '../utility.module.css';

const AuthenticatedRouter = ({ isLoggedIn }) => {
  const [isSidenavOpen, setIsSidenavOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = isSidenavOpen ? 'hidden' : 'auto';
    document.body.parentElement.style.overflow = isSidenavOpen ? 'hidden' : 'auto';
  }, [isSidenavOpen]);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const toggleSidenav = () => setIsSidenavOpen(!isSidenavOpen);

  return (
    <>
      <Sidenav isOpen={isSidenavOpen} />
      <div
        id="scrollable"
        className={
          classnames(
            utilStyle.mainOuterContainer,
            { [utilStyle.openSidenav]: isSidenavOpen },
          )
        }
      >
        <Header handleSidenavToggle={toggleSidenav} />
        <main>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/houses/:id" component={House} />
            <Route exact path="/favourites" component={Favourites} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </>
  );
};

const mapStateToProps = state => ({ isLoggedIn: !!state.user.user, error: state.user.error });

AuthenticatedRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AuthenticatedRouter);
