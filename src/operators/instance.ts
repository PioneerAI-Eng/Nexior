import router, { ROUTE_AUTH_LOGIN } from '@/router';
import store from '@/store';
import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

const httpClient: AxiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  }
});

httpClient.interceptors.request.use((config) => {
  console.log('store', store.state);
  const accessToken = store.state.token?.access;
  if (!config.headers) {
    config.headers = {};
  }
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      store.dispatch('common/resetAuth');
      router.push({
        name: ROUTE_AUTH_LOGIN,
        query: {
          redirect: router?.currentRoute?.value?.path
        }
      });
    }
    return Promise.reject(error);
  }
);

export { httpClient };
