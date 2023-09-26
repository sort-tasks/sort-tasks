import { gql } from '@apollo/client';

export const Me = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;

export const Login = gql`
  mutation Login($input: AuthLoginInput!) {
    authLogin(input: $input) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
export const Register = gql`
  mutation Register($input: AuthRegisterInput!) {
    authRegister(input: $input)
  }
`;
