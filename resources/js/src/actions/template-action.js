import axios from 'axios';
import {templateApi as apiUrl} from './config';

export const storeTemplate = (data) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/store`, data)
      .then(response => {
        dispatch(storeTemplateCompleted(response.data.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const storeTemplateCompleted = (data) => {
  return {
    type: "STORE_TEMPLATE_COMPLETED",
    payload: data,
  }
};

export const getTemplates = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/getData`)
      .then(response => {
        dispatch(getTemplatesCompleted(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getTemplatesCompleted = (data) => {
  return {
    type: "GET_TEMPLATES_COMPLETED",
    payload: data,
  }
};

export const toggleActiveTemplate = (i, data) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/toggleActive/${data.id}`)
      .then(response => {
        dispatch(toggleActiveTemplateCompleted(i, data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const toggleActiveTemplateCompleted = (i, data) => {
  return {
    type: "TOGGLE_ACTIVE_TEMPLATE_COMPLETED",
    payload: data,
    index: i
  }
};

export const togglePremiumTemplate = (i, data) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/togglePremium/${data.id}`)
      .then(response => {
        dispatch(togglePremiumTemplateCompleted(i, data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const togglePremiumTemplateCompleted = (i, data) => {
  return {
    type: "TOGGLE_PREMIUM_TEMPLATE_COMPLETED",
    payload: data,
    index: i
  }
};

export const destroyTemplate = (i, data) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/destroy/${data.id}`)
      .then(response => {
        dispatch(destroyTemplateCompleted(i, data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const destroyTemplateCompleted = (i, data) => {
  return {
    type: "DESTROY_TEMPLATE_COMPLETED",
    payload: data,
    index: i
  }
};

export const updateTemplate = (id, data) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/update/${id}`, {
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
