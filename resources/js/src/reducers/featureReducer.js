import update from 'react-addons-update';

const initialState = {
  feature: {},
  features: [],
  pagination: {},
}

export default function featureReducer(state= initialState, action) {
  switch (action.type) {
    case "GET_FEATURE_COMPLETED":
      return {...state, feature: action.payload};
    case "GET_FEATURES_COMPLETED":
      return {...state, features: action.payload.data, pagination: action.payload.meta.pagination};
    case "DESTROY_FEATURE_COMPLETED":
      return {...state, features: state.features.filter(data => data.id !== action.payload.id)};
    case "STORE_FEATURE_COMPLETED":
      return {...state, features: state.features.concat(action.payload)};
    case "TOGGLE_ACTIVE_FEATURE_COMPLETED":
      return update(state, {
        features: {
          [action.index]: {
            active: {$set: !action.payload.active}
          }
        }
      });
    default:
    return state;
  }
}