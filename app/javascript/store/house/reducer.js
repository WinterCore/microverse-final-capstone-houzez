import {
  FETCH_HOUSE,
  FETCH_HOUSE_SUCCESS,
  FETCH_HOUSE_ERROR,
} from './actions';

export const INITIAL_STATE = {
  data: null,
  isLoading: false,
  error: null,
};

const houseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HOUSE:
      return { data: null, isLoading: true, error: null };
    case FETCH_HOUSE_SUCCESS:
      return { data: action.payload, isLoading: false, error: null };
    case FETCH_HOUSE_ERROR:
      return { data: null, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default houseReducer;
