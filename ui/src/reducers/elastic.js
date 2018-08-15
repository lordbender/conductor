/* eslint-disable consistent-return */
import axios from 'axios';

const initialState = {
  loading: false,
  query: '',
  result: 'Placeholder'
};

export default function elastic(state = initialState, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case 'SET_ELASTIC_QUERY':
      return {
        ...state,
        query: { ...action.data }
      };
    case 'SET_ELASTIC_QUERY_RESULT':
      return {
        ...state,
        result: { ...action.data }
      };
    default:
      return state;
  }
}

export const executeElasticQuery = () => (dispatch, state) => {
  console.log('getState', state);
  console.log('dispatch', dispatch);
  const { elastic: { query = '{}' } = {} } = state;

  return axios
    .post('/api/elastic', {
      query
    })
    .then(({ data }) => {
      dispatch({
        type: 'SET_ELASTIC_QUERY_RESULT',
        data
      });
    });
};

export const setQuery = query => dispatch => {
  dispatch({
    type: 'SET_ELASTIC_QUERY',
    query
  });
};
