import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const defaultState = {
  workflows: [],
  totalHits: 0,
  searchForm: {
    name: '',
    status: []
  }
};

const prefix = 'GLOBAL/WORKFLOW/WORKFLOW';
export const setWorkflows = createAction(`${prefix}SET_WORKFLOWS`);
export const setTotalHits = createAction(`${prefix}SET_TOTAL_HITS`);

export default handleActions(
  {
    [setWorkflows]: (state, { payload }) => ({
      ...state,
      workflows: [].concat(payload)
    }),
    [setTotalHits]: (state, { payload }) => ({
      ...state,
      totalHits: payload || 0
    })
  },
  defaultState
);

// eslint-disable-next-line
export const fetchWorkflows = () => async (dispatch, getState) => {
  try {
    const {
      data: { results = [], totalHits = 0 }
    } = await axios.get('/api/v1/workflows');

    dispatch(setWorkflows(results));
    dispatch(setTotalHits(totalHits));
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};
