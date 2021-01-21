import {
  FETCH_HOUSE,
  FETCH_HOUSE_SUCCESS,
  FETCH_HOUSE_ERROR,
  CHANGE_HOUSE_FAVOURITE_STATE,
} from './actions';

export const INITIAL_STATE = {
  data: null,
  isLoading: false,
  error: null,
  isFavouriteLoading: false,
  favouriteError: null,
};

const houseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HOUSE:
      return { ...INITIAL_STATE, isLoading: true };
    case FETCH_HOUSE_SUCCESS:
      return { ...INITIAL_STATE, data: action.payload };
    case FETCH_HOUSE_ERROR:
      return { ...INITIAL_STATE, error: action.payload };
    case CHANGE_HOUSE_FAVOURITE_STATE:
      return { ...state, isFavouriteLoading: false, data: { ...state.data, favourited: action.payload } };
    default:
      return state;
  }
};

export default houseReducer;
