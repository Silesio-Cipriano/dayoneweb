import Error from 'next/error';
import { v4 as uuid } from 'uuid';
import { api } from './api';
type SignInRequestData = {
  email: string;
  password: string;
};

// const delay = (amount = 750) =>
//   new Promise((resolve) => setTimeout(resolve, amount));

// export async function signInRequest(data: SignInRequestData) {
//   await delay();

//   return {
//     token: uuid(),
//     user: {
//       username: 'Scipriano',
//       name: 'Silesio Cipriano',
//       email: 'silesiocipriano',
//       avatar: 'https://github.com/Silesio-Cipriano.png',
//       createdAt: new Date(),
//     },
//   };
// }

// export async function recoveryUserInformation() {
//   await delay();

//   return {
//     user: {
//       username: 'Scipriano',
//       name: 'Silesio Cipriano',
//       email: 'silesiocipriano',
//       avatar: 'https://github.com/Silesio-Cipriano.png',
//       createdAt: new Date(),
//     },
//   };
// }

type User = {
  username: string;
  name: any;
  email: any;
  avatar: any;
  createdAt: any;
  birthday: any;
};
type IResponse = {
  token: string | null;
  user: User | null;
};
export async function signInRequest({ email, password }: SignInRequestData) {
  let response: IResponse = { token: null, user: null };
  await api
    .post('/sessions', {
      email,
      password,
    })
    .then(({ data }) => {
      console.log('Token', data);
      console.log();
      response = {
        token: data.token,
        user: {
          username: '',
          name: data.user.name,
          email: data.user.email,
          avatar: data.user.avatar,
          createdAt: data.user.createdAt,
          birthday: data.user.birthday,
        },
      };
    })
    .catch((error) => {
      console.log('Erro: ', error);
    });
  return response;
}

export async function recoveryUserInformation() {
  let response: IResponse = { token: null, user: null };
  await api
    .get('/user/userByToken')
    .then(({ data }) => {
      console.log('data:', data);
      response = {
        token: null,
        user: {
          username: '',
          name: data.name,
          email: data.email,
          avatar: data.avatar,
          createdAt: data.createdAt,
          birthday: data.birthday,
        },
      };
    })
    .catch((error) => {
      console.log('Erro: ', error);
    });
  return response;
}
