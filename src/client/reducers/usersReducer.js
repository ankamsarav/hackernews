import { FETCH_TOP_NEWS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_TOP_NEWS:
      return action.payload;

    default:
      return state;
  }
};
