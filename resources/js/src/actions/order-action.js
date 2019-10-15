import axios from 'axios';
import {orderApi as apiUrl} from './config';

export const storeOrder = (data) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/store`, data)
      .then(response => {
        dispatch(storeOrderCompleted(response.data.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const storeOrderCompleted = (data) => {
  return {
    type: "STORE_ORDER_COMPLETED",
    payload: data,
  }
};

export const getOrders = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/getData`)
      .then(response => {
        dispatch(getOrdersCompleted(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getOrdersCompleted = (data) => {
  return {
    type: "GET_ORDERS_COMPLETED",
    payload: data,
  }
};

export const toggleActiveOrder = (i, data) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/toggleActive/${data.id}`)
      .then(response => {
        dispatch(toggleActiveOrderCompleted(i, data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const toggleActiveOrderCompleted = (i, data) => {
  return {
    type: "TOGGLE_ACTIVE_ORDER_COMPLETED",
    payload: data,
    index: i
  }
};

export const destroyOrder = (i, data) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/destroy/${data.id}`)
      .then(response => {
        dispatch(destroyOrderCompleted(i, data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const destroyOrderCompleted = (i, data) => {
  return {
    type: "DESTROY_ORDER_COMPLETED",
    payload: data,
    index: i
  }
};

export const getOrder = (slug) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/show/${slug}`)
      .then(response => {
        dispatch(getOrderCompleted(response.data.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getOrderCompleted = (data) => {
  return {
    type: "GET_ORDER_COMPLETED",
    payload: data,
  }
};

export const updateOrder = (slug, data) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/update/${slug}`, {
        data: data,
        _method: 'PUT'
      })
      .then(response => {
        // dispatch(getPackageCompleted(response.data.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
