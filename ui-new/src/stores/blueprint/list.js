import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const defaultState = {
  blueprints: [],
  searchForm: {
    name: '',
    status: []
  }
};

const prefix = 'GLOBAL/BLUEPRINT/LIST';
export const setBlueprints = createAction(`${prefix}SET_BLUEPRINTS`);

export default handleActions(
  {
    [setBlueprints]: (state, { payload }) => ({
      ...state,
      blueprints: [].concat(payload)
    })
  },
  defaultState
);

// eslint-disable-next-line
export const fetchBlueprints = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/api/v1/blueprints');

    dispatch(setBlueprints(data));
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};
