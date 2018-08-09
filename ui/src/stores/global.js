import { createAction, handleActions } from 'redux-actions';

const defaultState = {
  appWidth: '1000px',
  errors: []
};

const prefix = 'GLOBAL';
export const menuVisible = createAction(`${prefix}/MENU_VISIBLE`);
export const setErrors = createAction(`${prefix}/SET_ERROR`);

// https://redux-actions.js.org/introduction/tutorial
const reducer = handleActions(
  {
    [menuVisible]: state => {
      return { ...state, appWidth: `${document.body.clientWidth - 180}px` };
    },
    [setErrors]: (state, { payload }) => {
      return { ...state, errors: [].concat(payload || []) };
    }
  },
  defaultState
);
export default reducer;
