import { createUserMutation, getUserQuery } from '@graphql';
import { GraphQLClient } from 'graphql-request';

const isProduction = process.env.NODE_ENV === 'production';

const apiGrafbaseUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
  : 'http://127.0.0.1:4000/graphql';

const apiGrafbaseKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'anything';

const aplicationUrl = isProduction
  ? process.env.NEXT_PUBLIC_APP_URL || ''
  : 'http://localhost:3000';

const client = new GraphQLClient(apiGrafbaseUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUser = (email: string) => {
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  return makeGraphQLRequest(createUserMutation, { name, email, avatarUrl });
};
