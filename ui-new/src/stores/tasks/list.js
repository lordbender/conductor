import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const defaultState = {
  tasks: [],
  totalHits: 0,
  searchForm: {
    name: '',
    status: []
  }
};

const prefix = 'GLOBAL/TASKS/LIST';
export const setTasks = createAction(`${prefix}SET_TASKS`);
export const setTotalHits = createAction(`${prefix}SET_TOTAL_HITS`);

export default handleActions(
  {
    [setTasks]: (state, { payload }) => ({
      ...state,
      tasks: [].concat(payload)
    }),
    [setTotalHits]: (state, { payload }) => ({
      ...state,
      totalHits: payload || 0
    })
  },
  defaultState
);

// eslint-disable-next-line
export const fetchTasks = () => async (dispatch, getState) => {
  try {
    const {
      data: { results = [], totalHits = 0 }
    } = await axios.get('/api/v1/tasks');

    dispatch(setTasks(results));
    dispatch(setTotalHits(totalHits));
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};
