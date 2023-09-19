import { GraphQLClient } from 'graphql-request';

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL
  : 'http://127.0.0.1:4000/graphql';

const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'anything';

const connectToDatabase = new GraphQLClient('apiUrl');

const makeGraphQLRequest = (query: string, variables = {}) => {
  try {
    //conected to the database...
  } catch (error) {}
};
