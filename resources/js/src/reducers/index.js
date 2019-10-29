import { combineReducers } from 'redux';
import feature from './featureReducer';
import packages from './packageReducer';
import order from './orderReducer';
import template from './templateReducer';

const allReducers = combineReducers({
  feature: feature,
  package: packages,
  order: order,
  template: template,
});

export default allReducers;
