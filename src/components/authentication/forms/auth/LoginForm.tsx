import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '../../../../graphql/authentication/mutations';
import { GraphQLError } from 'graphql';
import Error from '../../../Layouts/Error';
import { AuthContext } from '../../../../context/authContext';


const LoginForm = () => {
    let navigate = useNavigate();
    const context = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<readonly GraphQLError[]>([]);

    const [login] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            context.setAuthenticated(data.login);
            navigate('/dashboard');
        },
        onError: ({ graphQLErrors }) => {
            setErrors(graphQLErrors);
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);
        login({ variables: { email, password } });
    };

    return (
        <>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="email"
                        placeholder="Email address"
                        autoComplete="on"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="password"
                        placeholder="Password"
                        autoComplete="on"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                        <NavLink to="/forgot-password">
                            Forgot password?
                        </NavLink >
                    </button>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-gray-100  py-2 px-3 rounded  hover:bg-blue-800 hover:text-gray-100">
                    Sign in
                </button>

                <p className="text-md font-light text-gray-500 dark:text-gray-600">
                    Don’t have an account yet? &nbsp;
                    <button className="font-medium text-primary-600 hover:underline dark:text-primary-700">
                        <NavLink to="/register">
                            Register
                        </NavLink >
                    </button>
                </p>
            </form >

            {
                errors && errors.length > 0 && (
                    <Error errors={errors} />
                )
            }
        </>
    );
};

export default LoginForm;