import { v4 as uuid } from 'uuid';
type SignInRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: SignInRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      username: 'Scipriano',
      name: 'Silesio Cipriano',
      email: 'silesiocipriano',
      avatar: 'https://github.com/Silesio-Cipriano.png',
      createdAt: '2023-01-01T16:22:33.691Z',
    },
  };
}

export async function recoveryUserInformation() {}
