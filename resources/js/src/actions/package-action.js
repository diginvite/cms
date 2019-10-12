import axios from 'axios';
import {packageApi as apiUrl} from './config';

export const storePackage = (data) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/store`, data)
      .then(response => {
        dispatch(storePackageCompleted(response.data.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const storePackageCompleted = (data) => {
  return {
    type: "STORE_PACKAGE_COMPLETED",
    payload: data,
  }
};

export const getPackages = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/getData`)
      .then(response => {
        dispatch(getPackagesCompleted(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getPackagesCompleted = (data) => {
  return {
    type: "GET_PACKAGES_COMPLETED",
    payload: data,
  }
};

export const taggleActivePackage = (i, data) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/toggleActive/${data.id}`)
      .then(response => {
        dispatch(taggleActivePackageCompleted(i, data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const taggleActivePackageCompleted = (i, data) => {
  return {
    type: "TOGGLE_ACTIVE_PACKAGE_COMPLETED",
    payload: data,
    index: i
  }
};

export const destroyPackage = (i, data) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/destroy/${data.id}`)
      .then(response => {
        dispatch(destroyPackageCompleted(i, data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const destroyPackageCompleted = (i, data) => {
  return {
    type: "DESTROY_PACKAGE_COMPLETED",
    payload: data,
    index: i
  }
};

export const getPackage = (slug) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/show/${slug}`)
      .then(response => {
        dispatch(getPackageCompleted(response.data.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getPackageCompleted = (data) => {
  return {
    type: "GET_PACKAGE_COMPLETED",
    payload: data,
  }
};

export const updatePackage = (slug, data) => {
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

export const updatePackageCompleted = (data) => {
  return {
    type: "UPDATE_PACKAGE_COMPLETED",
    payload: data,
  }
};

export const featureSyncPackage = (slug, data) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/featureSync/${slug}`, {
        data: data,
        _method: 'PUT'
      })
      .then(response => {
        console.log(data);
        
        // dispatch(getPackageCompleted(response.data.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
