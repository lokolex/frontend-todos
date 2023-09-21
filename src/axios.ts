import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://p5555-z0808c543-z7c7a7d5a-gtw.zb20e5e48.qovery.fr',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
