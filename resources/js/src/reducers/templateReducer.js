import update from 'react-addons-update';

const initialState = {
  template: {},
  templates: [],
  pagination: {},
}

export default function templateReducer(state= initialState, action) {
  switch (action.type) {
    case "GET_TEMPLATES_COMPLETED":
      return {...state, templates: action.payload.data, pagination: action.payload.meta.pagination};
    case "DESTROY_TEMPLATE_COMPLETED":
      return {...state, templates: state.templates.filter(data => data.id !== action.payload.id)};
    case "STORE_TEMPLATE_COMPLETED":
      return {...state, templates: state.templates.concat(action.payload)};
    case "TOGGLE_ACTIVE_TEMPLATE_COMPLETED":
      return update(state, {
        templates: {
          [action.index]: {
            active: {$set: !action.payload.active}
          }
        }
      });
    case "TOGGLE_PREMIUM_TEMPLATE_COMPLETED":
      return update(state, {
        templates: {
          [action.index]: {
            premium: {$set: !action.payload.premium}
          }
        }
      });
    default:
    return state;
  }
}