import { useState, useEffect, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { EMAIL_VERIFICATION } from '../../../../graphql/authentication/mutations';
import { GraphQLError } from 'graphql';
import Error from '../../../Layouts/Error';
import Loader from '../../../Layouts/Loader';


const EmailVerificationForm = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<readonly GraphQLError[]>([]);

    const [verify] = useMutation(EMAIL_VERIFICATION, {
        onCompleted: () => {
            setLoading(false);
            navigate('/login');
        },
        onError: ({ graphQLErrors }) => {
            setLoading(false);
            setErrors(graphQLErrors);
        },
    });

    const handleSubmit = useCallback(() => {
        if (code) {
            verify({ variables: { input: { code } } });
        }
    }, [code, verify]);

    useEffect(() => {
        if (token) {
            setCode(token.replace('token=', ''));
            handleSubmit();
        }
    }, [token, handleSubmit]);

    return (
        <>
            <Loader loading={loading} />
            {errors.length > 0 && <Error errors={errors} />}
        </>
    );
};

export default EmailVerificationForm;