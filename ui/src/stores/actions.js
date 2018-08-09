import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';
import { setErrors } from 'stores/global';

const defaultState = {
  terminateAttempt: {
    workflowId: '',
    inProgress: false
  }
};

const prefix = 'ACTIONS';
export const terminatingWorkflow = createAction(`${prefix}/TERMINATING_WORKFLOW`);

const reducer = handleActions(
  {
    [terminatingWorkflow]: (state, { payload }) => {
      return {
        ...state,
        terminateAttempt: { ...payload }
      };
    }
  },
  defaultState
);
export default reducer;

export const terminateWorkflow = workflowId => dispatch => {
  dispatch(terminatingWorkflow({ workflowId, inProgress: true }));
  return axios
    .delete(`/api/wfe/terminate/${workflowId}`)
    .then(() => {
      dispatch(terminatingWorkflow('', false));
    })
    .catch(e => {
      dispatch(setErrors([{ ...e }]));
    });
};

export const restartWorfklow = workflowId => dispatch => {
  return axios
    .post(`/api/wfe/restart/${workflowId}`)
    .then(() => {
      dispatch({
        type: 'RECEIVED_RESTART_WORKFLOW',
        workflowId
      });
    })
    .catch(e => {
      dispatch({
        type: 'REQUEST_ERROR',
        e
      });
    });
};

export const retryWorfklow = workflowId => dispatch => {
  return axios
    .post(`/api/wfe/retry/${workflowId}`)
    .then(() => {
      dispatch({
        type: 'RECEIVED_RETRY_WORKFLOW',
        workflowId
      });
    })
    .catch(e => {
      dispatch({
        type: 'REQUEST_ERROR',
        e
      });
    });
};

export const pauseWorfklow = workflowId => dispatch => {
  return axios
    .post(`/api/wfe/pause/${workflowId}`)
    .then(() => {
      dispatch({
        type: 'RECEIVED_PAUSE_WORKFLOW',
        workflowId
      });
    })
    .catch(e => {
      dispatch({
        type: 'REQUEST_ERROR',
        e
      });
    });
};

export const resumeWorfklow = workflowId => dispatch => {
  return axios
    .post(`/api/wfe/resume/${workflowId}`)
    .then(() => {
      dispatch({
        type: 'RECEIVED_RESUME_WORKFLOW',
        workflowId
      });
    })
    .catch(e => {
      dispatch({
        type: 'REQUEST_ERROR',
        e
      });
    });
};
