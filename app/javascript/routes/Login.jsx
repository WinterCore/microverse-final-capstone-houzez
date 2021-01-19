import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useSnackbar} from 'notistack';
import {Redirect} from 'react-router-dom';

import Button from '../components/Button';

import {CLIENT_ID} from '../defaults';
import {login} from '../store/user/actions';

import styles from './Login.module.css';

const Login = ({ isLoggedIn, error, login, authenticating }) => {
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        if (error)
            enqueueSnackbar(error, { variant: 'error' });
    }, [error]);

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>Sign In</h1>
                <p>Hey there! Sign in and start looking for houses</p>
                <GoogleLogin
                    clientId={CLIENT_ID}
                    onSuccess={data => login(data.tokenId)}
                    onFailure={console.log}
                    render={props => (
                        <Button
                            onClick={props.onClick}
                            disabled={props.disabled}
                            loading={authenticating}
                        >
                            Login with Google
                        </Button>
                    )}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.user.user,
  error: state.user.error,
  authenticating: state.user.authenticating
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ login }, dispatch);

Login.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    error: PropTypes.string,
    login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
