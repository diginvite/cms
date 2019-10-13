import { combineReducers } from 'redux';
import feature from './featureReducer';
import packages from './packageReducer';
import customer from './customerReducer';

const allReducers = combineReducers({
  feature: feature,
  package: packages,
  customer: customer,
});

export default allReducers;
