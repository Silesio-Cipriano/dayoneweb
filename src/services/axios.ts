import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(context?: any) {
  const { 'dayone.token': token } = parseCookies(context);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
