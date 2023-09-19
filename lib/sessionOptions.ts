import { SessionInterface } from '@common.types';
import { auth } from '@grafbase/sdk';
import NextAuth, { NextAuthOptions, User, getServerSession } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  // jwt: {
  //   encode: async ({ secret, token }) => {},
  //   decode: async ({ secret, token }) => {},
  // },
  theme: {
    colorScheme: 'light',
    logo: '/logo.svg',
  },

  callbacks: {
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // if user exists, return true to allow sign in

        // if user does not exist, return false to disallow sign in

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      return session;
    },
  },
};

export const getCurrentSession = async () => {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
};
