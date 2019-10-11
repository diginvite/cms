import update from 'react-addons-update';

const initialState = {
  package: {},
  packages: [],
  pagination: {},
}

export default function packageReducer(state= initialState, action) {
  switch (action.type) {
    case "GET_PACKAGE_COMPLETED":
      return {...state, package: action.payload};
    case "GET_PACKAGES_COMPLETED":
      return {...state, packages: action.payload.data, pagination: action.payload.meta.pagination};
    case "DESTROY_PACKAGE_COMPLETED":
      return {...state, packages: state.packages.filter(data => data.id !== action.payload.id)};
    case "STORE_PACKAGE_COMPLETED":
      return {...state, packages: state.packages.concat(action.payload)};
    case "TOGGLE_ACTIVE_PACKAGE_COMPLETED":
      return update(state, {
        packages: {
          [action.index]: {
            active: {$set: !action.payload.active}
          }
        }
      });
    default:
      return state;
  }
}