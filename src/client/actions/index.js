import axios from 'axios';
import * as types from './types';

export default (page = 0) => async dispatch => {
  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`;
  const res = await axios.get(url);

  dispatch({
    type: types.FETCH_TOP_NEWS,
    payload: res.data.hits
  });
};
