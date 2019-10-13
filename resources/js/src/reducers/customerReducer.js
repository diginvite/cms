import update from 'react-addons-update';

const initialState = {
  customer: {},
  customers: [],
  pagination: {},
}

export default function customerReducer(state= initialState, action) {
  switch (action.type) {
    case "GET_CUSTOMER_COMPLETED":
      return {...state, customer: action.payload};
    case "GET_CUSTOMERS_COMPLETED":
      return {...state, customers: action.payload.data, pagination: action.payload.meta.pagination};
    case "DESTROY_CUSTOMERS_COMPLETED":
      return {...state, customers: state.customers.filter(data => data.id !== action.payload.id)};
    case "STORE_CUSTOMER_COMPLETED":
      return {...state, customers: state.customers.concat(action.payload)};
    case "TOGGLE_ACTIVE_CUSTOMER_COMPLETED":
      return update(state, {
        customers: {
          [action.index]: {
            active: {$set: !action.payload.active}
          }
        }
      });
    default:
    return state;
  }
}