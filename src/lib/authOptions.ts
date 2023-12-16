import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { URL_API } from '@/constants';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'rredentials',
      credentials: {
        email: { label: 'email', type: 'string' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        let user;

        try {
          // Realiza la autenticación con tus propias lógicas
          const res = await axios.post(URL_API + '/auth/login', credentials);
          // const user = res.data.user

          user = res.data.user;
          // console.log(user, 'soy el user');

          // Si la autenticación es exitosa, devuelve el objeto de usuario
          if (user) {
            user.accessToken = res.data.accessToken;
            return user;
            // eslint-disable-next-line brace-style
          }
          // Si la autenticación falla, devuelve null
          else throw new Error('Algo salio mal');
        } catch (error: any) {
          console.log(error.response.data);
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  // sesion de 1 hora momentaneamente, ya que el token del back dura 30 minutos
  session: {
    maxAge: 60 * 60 * 10,
  },
};