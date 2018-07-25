import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const defaultState = {
  blueprint: {}
};

const prefix = 'GLOBAL/METADATA/DETAIL';
export const setBlueprint = createAction(`${prefix}SET_METADATA`);

export default handleActions(
  {
    [setBlueprint]: (state, { payload }) => ({
      ...state,
      blueprint: { ...payload }
    })
  },
  defaultState
);

// eslint-disable-next-line
export const fetchBlueprint = workflowType => async (dispatch, getState) => {
  try {
    const { data: blueprint } = await axios.get(`/api/v1/blueprints/${workflowType}`);

    dispatch(setBlueprint(blueprint));

    return {
      ...blueprint
    };
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};
