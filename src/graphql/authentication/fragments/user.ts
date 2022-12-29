import { gql } from '@apollo/client';

export const userFragment = gql`
  fragment UserFragment on User {
    id
    name
    email
    blocked
    created_at
  }
`;
