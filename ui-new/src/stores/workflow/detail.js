import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const defaultState = {
  workflow: {}
};

const prefix = 'GLOBAL/WORKFLOW/DETAIL';
export const setWorkflow = createAction(`${prefix}SET_WORKFLOW`);
export const setWorkflowMetadata = createAction(`${prefix}SET_WORKFLOW_METADATA`);

export default handleActions(
  {
    [setWorkflow]: (state, { payload }) => ({
      ...state,
      workflow: { ...payload }
    }),
    [setWorkflowMetadata]: (state, { payload }) => ({
      ...state,
      workflowMetaData: { ...payload }
    })
  },
  defaultState
);

// eslint-disable-next-line
export const fetchWorkflow = workflowId => async (dispatch, getState) => {
  try {
    const { data: workflowDetail } = await axios.get(`/api/v1/workflows/${workflowId}`);

    dispatch(setWorkflow(workflowDetail));

    return {
      ...workflowDetail
    };
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};
