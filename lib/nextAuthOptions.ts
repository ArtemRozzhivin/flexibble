import { SessionInterface, UserProfile } from '@common.types';
import { auth } from '@grafbase/sdk';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import { createUser, getUser } from './actions';
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  jwt: {
    encode: async ({ secret, token }) => {
      const encodedJWT = jsonwebtoken.sign(
        {
          ...token,
          iss: 'grafbase',
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // 13 hours
        },
        secret,
      );

      return encodedJWT;
    },
    decode: async ({ secret, token }) => {
      const decodedJWT = jsonwebtoken.verify(token!, secret);

      return decodedJWT as JWT;
    },
  },
  theme: {
    colorScheme: 'light',
    logo: '/logo.svg',
  },

  callbacks: {
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // if user exists, return true to allow sign in
        const userExists = (await getUser(user?.email as string)) as { user?: UserProfile };

        // if user does not exist, return false to disallow sign in
        if (!userExists.user) {
          await createUser(user.name as string, user.email as string, user.image as string);
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      try {
        const userData = (await getUser(session?.user?.email as string)) as { user?: UserProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...userData?.user,
          },
        };

        return newSession;
      } catch (error) {
        console.log(error);
        return session;
      }
    },
  },
};

export const getCurrentSession = async () => {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
};
