import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const defaultState = {
  user: {}
};

const prefix = 'GLOBAL/SECURITY/SET_LOADING';
export const setUser = createAction(`${prefix}SET_USER`);

export default handleActions(
  {
    [setUser]: (state, { payload }) => ({
      ...state,
      user: { ...payload }
    })
  },
  defaultState
);

// eslint-disable-next-line
export const fetchAuthedUser = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/api/v1/user');
    dispatch(setUser(data));
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};
