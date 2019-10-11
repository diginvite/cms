import { combineReducers } from 'redux';
import feature from './featureReducer';
import packages from './packageReducer';

const allReducers = combineReducers({
  feature: feature,
  package: packages,
});

export default allReducers;
