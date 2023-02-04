import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD } from '../../../../graphql/authentication/mutations';
import { GraphQLError } from 'graphql';
import Error from '../../../Layouts/Error';
import Alert from '../../../Layouts/Alert';


const ForgotPasswordForm = () => {
    let navigate = useNavigate();
    const [isOpenAlert, setIsOpenAlert] = useState(false);

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<readonly GraphQLError[]>([]);
    const [callbackUrl] = useState('http://localhost:3000/reset-password/');

    const openAlert = () => {
        setIsOpenAlert(true);
    };

    const closeAlert = () => {
        setIsOpenAlert(false);
        navigate('/');
    };

    const [forgot] = useMutation(FORGOT_PASSWORD, {
        onCompleted: (data) => {
            openAlert();
        },
        onError: ({ graphQLErrors }) => {
            setErrors(graphQLErrors);
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        forgot({ variables: { input: { email, callbackUrl } } });
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

                <button type="submit" className="w-full bg-blue-600 text-gray-100  py-2 px-3 rounded  hover:bg-blue-800 hover:text-gray-100">
                    Submit
                </button>
            </form >

            <Alert
                isOpen={isOpenAlert}
                title="Success"
                message="An email has been sent to reset your password."
                onClose={closeAlert}
            />

            {
                errors && errors.length > 0 && (
                    <Error errors={errors} />
                )

            }
        </>

    );
}

export default ForgotPasswordForm;