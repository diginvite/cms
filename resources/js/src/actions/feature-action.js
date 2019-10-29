import axios from 'axios';
import {featureApi as apiUrl} from './config';

export const storeFeature = (data) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/store`, data)
      .then(response => {
        dispatch(storeFeatureCompleted(response.data.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const storeFeatureCompleted = (data) => {
  return {
    type: "STORE_FEATURE_COMPLETED",
    payload: data,
  }
};

export const getFeatures = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/getData`)
      .then(response => {
        dispatch(getFeaturesCompleted(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getFeaturesCompleted = (data) => {
  return {
    type: "GET_FEATURES_COMPLETED",
    payload: data,
  }
};

export const taggleActiveFeature = (i, data) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/toggleActive/${data.id}`)
      .then(response => {
        dispatch(taggleActiveFeatureCompleted(i, data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const taggleActiveFeatureCompleted = (i, data) => {
  return {
    type: "TOGGLE_ACTIVE_FEATURE_COMPLETED",
    payload: data,
    index: i
  }
};

export const destroyFeature = (i, data) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/destroy/${data.id}`)
      .then(response => {
        dispatch(destroyFeatureCompleted(i, data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const destroyFeatureCompleted = (i, data) => {
  return {
    type: "DESTROY_FEATURE_COMPLETED",
    payload: data,
    index: i
  }
};

export const getFeature = (slug) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/show/${slug}`)
      .then(response => {
        dispatch(getFeatureCompleted(response.data.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getFeatureCompleted = (data) => {
  return {
    type: "GET_FEATURE_COMPLETED",
    payload: data,
  }
};

export const updateFeature = (slug, data) => {
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

export const updateFeatureCompleted = (data) => {
  return {
    type: "UPDATE_FEATURE_COMPLETED",
    payload: data,
  }
};
