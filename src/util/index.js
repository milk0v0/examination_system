import axios from 'axios';
import message from './message';

class HttpRequest {
  constructor(options) {
    this.defaults = {
      baseUrl: ''
    }

    this.defaults = { ...this.defaults, ...options }
  }
  interceptors(install) {
    install.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      const phone = localStorage.getItem('phone');

      token && (config.headers.token = token);
      phone && (config.headers.phone = phone);

      return config
    }, err => {
      return Promise.reject(err)
    });

    install.interceptors.response.use(res => {
      const { data } = res;

      return data
    }, err => {
      return Promise.reject(err)
    });
  }

  request(options) {
    options = { ...this.defaults, ...options }
    const instance = axios.create(options);
    this.interceptors(instance);
    return instance
  }
}

const http = new HttpRequest({
  baseURL: '/api'
}).request();

export {
  message,
  http
}