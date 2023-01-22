import { gql } from '@apollo/client';
import { userFragment } from './fragments/user';

export const LOGIN_MUTATION = gql`
 mutation Login($email: String! $password: String!) {
  login(email: $email password: $password)
 }
`;

export const logout = gql`
  mutation Logout {
    logout
  }
`;

export const createUser = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String
    ) {
    createUser(
      input: {
        name: $name
        email: $email
        password: $password
      }) {
      ...UserFragment
    }
  }
  ${userFragment}
`;

export const updateUser = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $email: String
    $password: String
    ) {
    updateUser(
      input: {
        id: $id
        name: $name
        email: $email
        password: $password
      }) {
      ...UserFragment
    }
  }
  ${userFragment}
`;
