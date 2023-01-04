import { gql } from '@apollo/client';
import { userFragment } from './fragments/user';

// Query for current user (based on auth token)
export const ME = gql`
  query Me {
    me {
      ...UserFragment
    }
  }
  ${userFragment}
`;

export const user = gql`
  query User($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }
  ${userFragment}
`;
