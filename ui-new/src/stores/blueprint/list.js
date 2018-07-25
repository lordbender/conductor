import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const defaultState = {
  workflowDefinitions: [],
  searchForm: {
    name: '',
    status: []
  }
};

const prefix = 'GLOBAL/METADATA/LIST';
export const setWorkflowDefinitions = createAction(`${prefix}SET_WORKFLOW_DEFINITIONS`);

export default handleActions(
  {
    [setWorkflowDefinitions]: (state, { payload }) => ({
      ...state,
      workflows: [].concat(payload)
    })
  },
  defaultState
);

// eslint-disable-next-line
export const fetchWorkflowMetadatas = () => async (dispatch, getState) => {
  try {
    const {
      data: { results = [] }
    } = await axios.get('/api/v1/blueprints');

    dispatch(setWorkflowDefinitions(results));
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};
