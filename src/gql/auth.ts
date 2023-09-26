import { gql } from '@apollo/client';

export const login = gql`
  mutation Login($input: AuthLoginInput!) {
    authLogin(input: $input) {
      token
      user {
        id
      }
    }
  }
`;
