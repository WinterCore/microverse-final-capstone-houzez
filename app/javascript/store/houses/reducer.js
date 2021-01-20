import {
  FETCH_HOUSES,
  FETCH_HOUSES_SUCCESS,
  FETCH_HOUSES_ERROR,
  FETCH_MORE_HOUSES,
  FETCH_MORE_HOUSES_SUCCESS,
  FETCH_MORE_HOUSES_ERROR,
} from './actions';

export const INITIAL_STATE = {
  data: null,
  isLoading: false,
  error: null,
  page: 1,
  isLoadingMore: false,
  hasMore: true,
};

const housesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HOUSES:
      return {
        data: null, isLoading: true, error: null, page: 1, isLoadingMore: false, hasMore: true,
      };
    case FETCH_HOUSES_SUCCESS:
      return {
        ...action.payload, isLoading: false, error: null, isLoadingMore: false, hasMore: true,
      };
    case FETCH_HOUSES_ERROR:
      return {
        data: null,
        isLoading: false,
        error: action.payload,
        page: 1,
        isLoadingMore: false,
        hasMore: true,
      };
    case FETCH_MORE_HOUSES:
      return {
        ...state, isLoading: false, error: null, isLoadingMore: true, hasMore: true,
      };
    case FETCH_MORE_HOUSES_SUCCESS:
      return {
        page: action.payload.page,
        data: [...state.data, ...action.payload.data],
        isLoading: false,
        error: null,
        isLoadingMore: false,
        hasMore: action.payload.data.length > 0,
      };
    case FETCH_MORE_HOUSES_ERROR:
      return {
        ...state, isLoading: false, error: null, isLoadingMore: false, hasMore: true,
      };
    default:
      return state;
  }
};

export default housesReducer;