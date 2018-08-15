import { combineReducers } from 'redux';
import workflow from './workflow';
import elastic from './elastic';
import global from './global';

const workflowApp = combineReducers({
  workflow,
  global,
  elastic
});

export default workflowApp;
