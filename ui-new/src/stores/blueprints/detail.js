import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const defaultState = {
  blueprint: {}
};

const prefix = 'GLOBAL/METADATA/DETAIL';
export const setMetadata = createAction(`${prefix}SET_METADATA`);

export default handleActions(
  {
    [setMetadata]: (state, { payload }) => ({
      ...state,
      blueprint: { ...payload }
    })
  },
  defaultState
);

// eslint-disable-next-line
export const fetchBlueprint = workflowType => async (dispatch, getState) => {
  try {
    const { data: workflowMetadata } = await axios.get(`/api/v1/metadata/${workflowType}`);

    dispatch(setMetadata(workflowMetadata));

    return {
      workflowMetadata
    };
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};
