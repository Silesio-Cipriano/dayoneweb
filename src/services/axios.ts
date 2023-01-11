import axios from 'axios';
import { parseCookies } from 'nookies';
let baseUrl = 'https://dayone.onrender.com';

const env = process.env.NODE_ENV;
if (env == 'development') {
  baseUrl = 'http://localhost:3333';
}
export function getAPIClient(context?: any) {
  const { 'dayone.token': token } = parseCookies(context);

  const api = axios.create({
    baseURL: baseUrl,
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
