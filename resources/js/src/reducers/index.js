import { combineReducers } from 'redux';
import feature from './featureReducer';
import packages from './packageReducer';
import order from './orderReducer';

const allReducers = combineReducers({
  feature: feature,
  package: packages,
  order: order,
});

export default allReducers;
