import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'application/json';

axios.defaults.baseURL = 'http://8.217.91.191:8000';
axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axios;
