import { createAction, handleActions } from 'redux-actions';

const defaultState = {
  appWidth: '1000px'
};

const prefix = 'GLOBAL';
export const menuVisible = createAction(`${prefix}/MENU_VISIBLE`);

// https://redux-actions.js.org/introduction/tutorial
const reducer = handleActions(
  {
    [menuVisible]: state => {
      return { ...state, appWidth: `${document.body.clientWidth - 180}px` };
    }
  },
  defaultState
);
export default reducer;
