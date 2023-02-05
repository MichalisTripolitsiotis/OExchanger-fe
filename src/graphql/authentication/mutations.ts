import { gql } from '@apollo/client';
import { userFragment } from './fragments/user';

export const LOGIN_MUTATION = gql`
 mutation Login($email: String! $password: String!) {
  login(email: $email password: $password)
 }
`;

export const REGISTER_MUTATION = gql`
 mutation Register($input: RegisterInput!) {
  register(input: $input){
    message
  }
 }
`;

export const EMAIL_VERIFICATION = gql`
 mutation VerifyEmail($input: VerifyEmailInput!) {
  verifyEmail(input: $input)
 }
`;

export const FORGOT_PASSWORD = gql`
mutation ForgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input)
}
`;

export const PASSWORD_RESET = gql`
mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input)
}
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
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
