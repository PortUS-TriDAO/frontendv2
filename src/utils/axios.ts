import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'application/json';

// axios.defaults.baseURL = 'http://8.217.91.191:8000/v2';
axios.defaults.baseURL = '/v2';
axios.interceptors.response.use(
  function (response) {
    if (!response.data.success) {
      return Promise.reject(response.data.data);
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axios;
