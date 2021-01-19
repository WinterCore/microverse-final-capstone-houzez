import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const Index = ({ isLoggedIn }) => {
    if (!isLoggedIn) {
        return <Redirect to="/login" />
    }

    return (
        <div>
        </div>
    );
};

const mapStateToProps = (state) => ({ isLoggedIn: !!state.user.user });
const mapDispatchToProps = (dispatch) => ({});

Index.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
