import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { EMAIL_VERIFICATION } from '../../../../graphql/authentication/mutations';
import { GraphQLError } from 'graphql';
import Error from '../../../Layouts/Error';


const EmailVerificationForm = () => {
    let navigate = useNavigate();
    const [code, setCode] = useState('');
    const [errors, setErrors] = useState<readonly GraphQLError[]>([]);

    const { token } = useParams();

    useEffect(() => {
        if (token) {
            setCode(token.replace('token=', ''));
        }
    }, [token]);

    const [verify] = useMutation(EMAIL_VERIFICATION, {
        onCompleted: (data) => {
            navigate('/login');
        },
        onError: ({ graphQLErrors }) => {
            setErrors(graphQLErrors);
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        verify({ variables: { input: { code } } });
    };

    return (
        <>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <button type="submit" className="w-full bg-blue-600 text-gray-100  py-2 px-3 rounded  hover:bg-blue-800 hover:text-gray-100">
                        Verify Email
                    </button>
                </div>
            </form>
            {
                errors && errors.length > 0 && (
                    <Error errors={errors} />
                )

            }
        </>

    );
};

export default EmailVerificationForm;