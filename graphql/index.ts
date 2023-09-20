export const getUserQuery = `
  query User {
    user(by: {email: $email}) {
      name
      email
      avatarUrl
      description
      gitHubUrl
      linkedInUrl
    }
  }
`;

export const createUserMutation = `
  mutation UserCreate {
    userCreate(input: {$input}) {
      user {
        name
        email
        avatarUrl
        description
        gitHubUrl
        linkedInUrl
        id
      }
    }
  }
`;
