import update from 'react-addons-update';

const initialState = {
  feature: {},
  features: [],
}

export default function featureReducer(state= initialState, action) {
  switch (action.type) {
    case "GET_POST_COMPLETED":
      return {...state, feature: action.payload};
    case "GET_POSTS_COMPLETED":
      return {...state, features: action.payload};
    case "DESTROY_POST_COMPLETED":
      return {...state, features: state.features.filter(data => data.id !== action.payload)};
    case "STORE_POST_COMPLETED":
      return {...state, features: state.features.concat(action.payload)};
    case "TOGGLE_ACTIVE_POST_COMPLETED":
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