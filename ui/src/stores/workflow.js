import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const defaultState = {
  list: [],
  totalHits: 0,
  detail: {},
  exception: {}
};

const prefix = 'WORKFLOW';
export const setWorkflowList = createAction(`${prefix}/SET_WORKFLOW_LIST`);
export const setWorkflowDetail = createAction(`${prefix}/SET_WORKFLOW_DETAIL`);
export const setTotalHits = createAction(`${prefix}/SET_TOTAL_HITS`);
export const setException = createAction(`${prefix}/SET_EXCEPTION`);

export default handleActions(
  {
    [setWorkflowList]: (state, { payload }) => {
      return { ...state, list: [].concat(payload) };
    },
    [setWorkflowDetail]: (state, { payload }) => {
      return { ...state, detail: { ...payload } };
    },
    [setTotalHits]: (state, { payload }) => {
      return { ...state, totalHits: payload };
    },
    [setException]: (state, { payload }) => {
      return { ...state, exception: payload };
    }
  },
  defaultState
);

// const searchWorkflowsByTaskId = (dispatch, search, hours, start) => {
//   return axios.get(`/api/wfe/search-by-task/${search}?h=${hours}&start=${start}`).then(({ data }) => {
//     dispatch({
//       type: 'RECEIVED_WORKFLOWS',
//       data
//     });
//   });
// };

export const listWorkflows = (query, search, hours, fullstr, start) => dispatch => {
  const url = '/api/wfe';

  return axios.get(url).then(({ data: { result: { hits = [], totalHits = 0 } } }) => {
    dispatch(setWorkflowList(hits));
    dispatch(setTotalHits(totalHits));
  });
};

export const getWorkflowById = workflowId => dispatch => {
  const url = `/api/wfe/${workflowId}`;

  return axios.get(url).then(({ data: { result } }) => {
    dispatch(setWorkflowDetail(result));

    return result;
  });
};
