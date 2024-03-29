import { createContext, ReactNode, useEffect, useState } from 'react';
import { signInRequest, recoveryUserInformation } from '../services/auth';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import Router, { useRouter } from 'next/router';
import { api } from '../services/api';

type SignInData = {
  email: string;
  password: string;
};

type AuthProviderType = {
  children: ReactNode;
};

type User = {
  name: string;
  username: string;
  avatar: string;
  email: string;
  createdAt: Date;
  birthday: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderType) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    async function dataReload() {
      const { 'dayone.token': token } = parseCookies();

      if (token) {
        const { user } = await recoveryUserInformation();

        setUser(user);
      }
    }

    dataReload();
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    if (token) {
      setCookie(undefined, 'dayone.token', token, {
        maxAge: 60 * 60 * 1, //1 hora
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setTimeout(() => {
        setUser(user);

        router.push('/mydaynotes');
      }, 3000);
    } else {
      throw Error('Email ou senha inválida!');
    }
  }

  function signOut() {
    setUser(null);
    destroyCookie({}, 'dayone.token');
    Router.push('/');
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
