(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
  typeof define === 'function' && define.amd ? define(['exports', 'axios'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@cheryx2020/api-service"] = {}, global.axios));
})(this, (function (exports, axios) { 'use strict';

  axios.interceptors.request.use(function (config) {
    try {
      if (typeof localStorage === 'object') {
        const token = localStorage.getItem('accessToken');
        if (token && !config.headers.Authorization) {
          config.headers.Authorization =  'Bearer ' + token;
        }
      }
    } catch(e) {
    }
    return config;
  });
  const APIService = {
    post: (url, data, cf) => {
      return axios.post(`${process.env.NEXT_PUBLIC_apiBaseUrl}${url}`,data, cf);
    },
    put: (url, data, cf) => {
      return axios.put(`${process.env.NEXT_PUBLIC_apiBaseUrl}${url}`,data, cf);
    },
    get: (url) => {
      return axios.get(`${process.env.NEXT_PUBLIC_apiBaseUrl}${url}`);
    },
    delete : (url, data) => {
      return axios.delete(`${process.env.NEXT_PUBLIC_apiBaseUrl}${url}`,data);
    }
  };
  /**
   * Handle api call error
   */
  const handleApiError = (err, { callBackStatusCode, showAlert = true, callBackErrorMessage } = {}) => {
    let message = 'Unknow error';
    try {
      if (typeof callBackStatusCode === 'function') {
        callBackStatusCode(err.response.status);
      }
    } catch (e) { }
    if (err.response && err.response.data && err.response.data.error) {
      message = err.response.data.error;
    }
    if (typeof callBackErrorMessage === 'function') {
      callBackErrorMessage(message);
    }

    if (showAlert) {
      alert(message);
    }
  };

  const STATUS_CODE = {
    DUPLICATE: 409
  };
  /**
   * Show/hide loader for app
   * @param {*} dispatch 
   * @param {*} isLoading 
   */
  const setShowLoading = (dispatch, isLoading) => {
    if (typeof dispatch === 'function') {
      dispatch({type: 'LOADING', payload: isLoading});
    }
  };

  const makeQueryParamsFromObject = params => {
    let result = '', keys = [];
    if (params && typeof params === 'object') {
      keys = Object.keys(params);
      keys = keys.filter(item => ![null, undefined, ''].includes(params[item]));
    }
    if (keys.length > 0) {
      result += '?' + keys.map(item => {
        return `${item}=${params[item]}`;
      }).join('&');
    }
    return result;
  };

  exports.APIService = APIService;
  exports.STATUS_CODE = STATUS_CODE;
  exports.handleApiError = handleApiError;
  exports.makeQueryParamsFromObject = makeQueryParamsFromObject;
  exports.setShowLoading = setShowLoading;

}));
