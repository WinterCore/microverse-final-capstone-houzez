import PropTypes from 'prop-types';

export const user = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
});

export const state = {
  user: PropTypes.shape({
    user,
    authenticating: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};
