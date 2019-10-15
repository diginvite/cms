import update from 'react-addons-update';

const initialState = {
  order: {},
  orders: [],
  pagination: {},
}

export default function orderReducer(state= initialState, action) {
  switch (action.type) {
    case "GET_ORDER_COMPLETED":
      return {...state, order: action.payload};
    case "GET_ORDERS_COMPLETED":
      return {...state, orders: action.payload.data, pagination: action.payload.meta.pagination};
    case "DESTROY_ORDERS_COMPLETED":
      return {...state, orders: state.orders.filter(data => data.id !== action.payload.id)};
    case "STORE_ORDER_COMPLETED":
      return {...state, orders: state.orders.concat(action.payload)};
    case "TOGGLE_ACTIVE_ORDER_COMPLETED":
      return update(state, {
        orders: {
          [action.index]: {
            active: {$set: !action.payload.active}
          }
        }
      });
    default:
    return state;
  }
}