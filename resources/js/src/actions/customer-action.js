import axios from 'axios';
import {customerApi as apiUrl} from './config';

export const storeCustomer = (data) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/store`, data)
      .then(response => {
        dispatch(storeCustomerCompleted(response.data.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const storeCustomerCompleted = (data) => {
  return {
    type: "STORE_CUSTOMER_COMPLETED",
    payload: data,
  }
};

export const getCustomers = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/getData`)
      .then(response => {
        dispatch(getCustomersCompleted(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getCustomersCompleted = (data) => {
  return {
    type: "GET_CUSTOMERS_COMPLETED",
    payload: data,
  }
};

export const toggleActiveCustomer = (i, data) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/toggleActive/${data.id}`)
      .then(response => {
        dispatch(toggleActiveCustomerCompleted(i, data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const toggleActiveCustomerCompleted = (i, data) => {
  return {
    type: "TOGGLE_ACTIVE_CUSTOMER_COMPLETED",
    payload: data,
    index: i
  }
};

export const destroyCustomer = (i, data) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/destroy/${data.id}`)
      .then(response => {
        dispatch(destroyCustomerCompleted(i, data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const destroyCustomerCompleted = (i, data) => {
  return {
    type: "DESTROY_CUSTOMER_COMPLETED",
    payload: data,
    index: i
  }
};

export const getCustomer = (slug) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/show/${slug}`)
      .then(response => {
        dispatch(getCustomerCompleted(response.data.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getCustomerCompleted = (data) => {
  return {
    type: "GET_CUSTOMER_COMPLETED",
    payload: data,
  }
};

export const updateCustomer = (slug, data) => {
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
