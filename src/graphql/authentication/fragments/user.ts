import { gql } from '@apollo/client';

export const userFragment = gql`
  fragment UserFragment on User {
    id
    name
    email
    created_at,
    moderatedCommunitiesCount,
    subscribedCommunitiesCount,
    postsCount
  }
`;
