import { createContext, ReactNode, useEffect, useState } from 'react';
import { recoveryUserInformation, signInRequest } from '../services/auth';
import { parseCookies, setCookie } from 'nookies';
import Router from 'next/router';

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
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'dayone.token': token } = parseCookies();

    if (token) {
      recoveryUserInformation().then((response) => setUser(response.user));
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, 'dayone.token', token, {
      maxAge: 60 * 60 * 1, //1 hora
    });

    setUser(user);

    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
