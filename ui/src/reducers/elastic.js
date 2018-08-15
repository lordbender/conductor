/* eslint-disable consistent-return */
import axios from 'axios';

const initialState = {
  loading: false,
  query: '',
  result: { data: 'Placeholder' }
};

export default function elastic(state = initialState, { data = {}, type }) {
  // eslint-disable-next-line
  switch (type) {
    case 'SET_ELASTIC_QUERY':
      return {
        ...state,
        query: data
      };
    case 'SET_ELASTIC_QUERY_RESULT':
      return {
        ...state,
        result: { ...data }
      };
    default:
      return state;
  }
}

export const executeElasticQuery = () => (dispatch, getState) => {
  const { elastic: { query = {} } = {} } = getState();

  const parsed = JSON.parse(query);

  try {
    return axios.post('/api/elastic', parsed).then(({ data }) => {
      dispatch({
        type: 'SET_ELASTIC_QUERY_RESULT',
        data
      });
    });
  } catch (e) {
    console.error(e);
  }
};

export const setQuery = query => dispatch => {
  dispatch({
    type: 'SET_ELASTIC_QUERY',
    data: query
  });
};
