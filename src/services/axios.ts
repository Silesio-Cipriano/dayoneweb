import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(context?: any) {
  const { 'dayone.token': token } = parseCookies(context);

  console.log('Ver:', process.env.BASEURL);
  const api = axios.create({
    baseURL: process.env.BASEURL,
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
