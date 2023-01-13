import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from './api';
import { signInRequest } from './auth';

type ISignUp = {
  name: string;
  email: string;
  password: string;
  birthday: string;
};

type IResponse = {
  email: string | null;
  password: string | null;
};

export async function signUpRequest({
  name,
  email,
  password,
  birthday,
}: ISignUp) {
  let response: IResponse = { email: null, password: null };
  return await api.post('/user', {
    name,
    email,
    password,
    birthday,
  });
}
