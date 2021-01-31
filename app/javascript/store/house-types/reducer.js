import {
  FETCH_HOUSE_TYPES,
  FETCH_HOUSE_TYPES_SUCCESS,
  FETCH_HOUSE_TYPES_ERROR,
} from './actions';

export const INITIAL_STATE = {
  data: null,
  isLoading: false,
  error: null,
};

const housesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HOUSE_TYPES:
      return { data: null, isLoading: true, error: null };
    case FETCH_HOUSE_TYPES_SUCCESS:
      return { data: action.payload, isLoading: false, error: null };
    case FETCH_HOUSE_TYPES_ERROR:
      return { data: null, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default housesReducer;
