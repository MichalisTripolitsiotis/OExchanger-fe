// Login form component
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
 mutation Login($email: String! $password: String!) {
  login(email: $email password: $password)
 }
`;

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useMutation(LOGIN_MUTATION); // {data}

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login({ variables: { email, password } });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email:</label>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <button type="submit">Log in</button>
        </form>
    );
};

export default LoginForm;