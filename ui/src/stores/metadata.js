import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const defaultState = {
  list: [],
  detail: {}
};

const prefix = 'METADATA';
export const setMetadataList = createAction(`${prefix}/SET_METADATA_LIST`);
export const setMetadataDetail = createAction(`${prefix}/SET_METADATA_DETAIL`);

// https://redux-actions.js.org/introduction/tutorial
export default handleActions(
  {
    [setMetadataList]: (state, { payload }) => {
      return { ...state, list: [].concat(payload) };
    },
    [setMetadataDetail]: (state, { payload }) => {
      return { ...state, detail: { ...payload } };
    }
  },
  defaultState
);

export const listWorkflowDefs = () => dispatch => {
  return axios.get('/api/wfe/metadata/workflow').then(({ data: { result = [] } }) => {
    dispatch(setMetadataList(result));
  });
};

export const getWorkflowDefDetail = (name, version) => dispatch => {
  return axios.get(`/api/wfe/metadata/workflow/${name}/${version}`).then(({ data: { result } }) => {
    dispatch(setMetadataDetail(result));
  });
};
