import PropTypes from 'prop-types';

export const user = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export const houseType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export const houseSnippet = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  price_per_month: PropTypes.number.isRequired,
  house_type: PropTypes.shape(houseType),
};

export const house = {
  ...houseSnippet,
  description: PropTypes.string.isRequired,
  favourited: PropTypes.bool.isRequired,
};

export const state = {
  user: PropTypes.shape({
    user,
    authenticating: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }),
};
