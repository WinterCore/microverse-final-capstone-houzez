import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from '../containers/Header';

import Index from '../routes/Index';
import House from '../routes/House';
import Favourites from '../routes/Favourites';

const AuthenticatedRouter = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={ Index } />
        <Route exact path="/houses/:id" component={ House } />
        <Route exact path="/favourites" component={ Favourites } />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => ({ isLoggedIn: !!state.user.user, error: state.user.error });
const mapDispatchToProps = (dispatch) => ({});

AuthenticatedRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRouter);
