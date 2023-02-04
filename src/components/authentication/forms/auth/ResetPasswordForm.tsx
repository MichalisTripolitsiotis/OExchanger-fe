import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { PASSWORD_RESET } from '../../../../graphql/authentication/mutations';
import { GraphQLError } from 'graphql';
import Error from '../../../Layouts/Error';
import ValidationError from "../../../Layouts/ValidationError";
import { useValidationErrors } from "../../../../hooks/useValidationErrors";


const ResetPasswordForm = () => {
    const { errors, handleErrors } = useValidationErrors();
    const navigate = useNavigate();
    const { token, user } = useParams();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const [code, setCode] = useState('');
    const [graphQLErrors, setGraphQLErrors] = useState<readonly GraphQLError[]>([]);

    const [reset] = useMutation(PASSWORD_RESET, {
        onCompleted: (data) => {
            navigate('/login');
        },
        onError: (error) => {
            handleErrors(error);
            setGraphQLErrors(error.graphQLErrors);
        }
    });

    useEffect(() => {
        if (token && user) {
            setCode(token.replace('token=', ''));
            setEmail(user.replace('user=', ''));
        }
    }, [token, user]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        reset({ variables: { input: { code, email, password, password_confirmation } } });
    };


    return (
        <>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="password"
                        placeholder="********"
                        autoComplete="on"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Confirmation</label>
                    <input
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="password_confirmation"
                        placeholder="********"
                        autoComplete="on"
                        value={password_confirmation}
                        onChange={(event) => setPasswordConfirmation(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="w-full bg-blue-600 text-gray-100  py-2 px-3 rounded  hover:bg-blue-800 hover:text-gray-100">
                        Reset your password
                    </button>
                </div>
            </form>
            <br />
            <div>
                {Object.values(errors).length === 0 && graphQLErrors.length > 0 && <Error errors={graphQLErrors} />}
                {Object.values(errors).length > 0 && <ValidationError errors={Object.values(errors)} />}
            </div>
        </>
    );
};

export default ResetPasswordForm;