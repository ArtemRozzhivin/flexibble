import { ProjectForm } from '@common.types';
import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getUserByIdQuery,
  getUserQuery,
  projectsQuery,
  projectsQueryByCategory,
  updateProjectMutation,
} from '@graphql';
import { isBase64Url } from '@utils';
import { GraphQLClient } from 'graphql-request';

const isProduction = process.env.NODE_ENV === 'production';

const apiGrafbaseUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
  : 'http://127.0.0.1:4000/graphql';

const apiGrafbaseKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'anything';

const serverUrl = isProduction ? process.env.NEXT_PUBLIC_APP_URL || '' : 'http://localhost:3000';

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
  client.setHeader('x-api-key', apiGrafbaseKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const getUserById = (id: string) => {
  client.setHeader('x-api-key', apiGrafbaseKey);

  return makeGraphQLRequest(getUserByIdQuery, { id });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader('x-api-key', apiGrafbaseKey);
  const variables = { input: { name, email, avatarUrl } };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const uploadImage = async (imagePath: string) => {
  try {
    const result = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath }),
    });

    return result.json();
  } catch (error) {
    throw error;
  }
};

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader('Authorization', `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const editProject = async (form: ProjectForm, projectId: string, token: string) => {
  client.setHeader('Authorization', `Bearer ${token}`);

  let updatedForm = { ...form };
  const isUrlBase64 = isBase64Url(form.image);

  if (isUrlBase64) {
    const newImage = await uploadImage(form.image);

    if (newImage.url) {
      updatedForm = { ...form, image: newImage.url };
    }
  }

  const variables = {
    id: projectId,
    input: updatedForm,
  };

  return makeGraphQLRequest(updateProjectMutation, variables);
};

export const deleteProject = async (projectId: string, token: string) => {
  client.setHeader('Authorization', `Bearer ${token}`);

  return makeGraphQLRequest(deleteProjectMutation, { id: projectId });
};

export const fetchAllProjects = async (category?: string | null, endcursor?: string | null) => {
  client.setHeader('x-api-key', apiGrafbaseKey);

  console.log('CATEGORY', category);
  console.log('ENDCURSOR', endcursor);

  if (category) {
    return makeGraphQLRequest(projectsQueryByCategory, { category, endcursor });
  }

  return makeGraphQLRequest(projectsQuery, { endcursor });
};

export const fetchProjectDetailsById = async (id: string) => {
  client.setHeader('x-api-key', apiGrafbaseKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const fetchToken = async () => {
  try {
    const result = await fetch(`${serverUrl}/api/auth/token`);

    return result.json();
  } catch (error) {
    throw error;
  }
};
