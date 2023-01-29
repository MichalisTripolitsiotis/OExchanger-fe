// @ts-nocheck
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { REGISTER_MUTATION } from "../../../../graphql/authentication/mutations";
import { NavLink, useNavigate } from "react-router-dom";
import ValidationError from "../../../Layouts/ValidationError";
import { useValidationErrors } from "../../../../hooks/useValidationErrors";
import Alert from "../../../Layouts/Alert";

const RegisterForm = () => {
    let navigate = useNavigate();

    const [isOpenAlert, setIsOpenAlert] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [callbackUrl] = useState('http://localhost:3000');

    const { errors, handleErrors } = useValidationErrors();

    const openAlert = () => {
        setIsOpenAlert(true);
    };

    const closeAlert = () => {
        setIsOpenAlert(false);
        navigate('/');
    };

    const [register] = useMutation(REGISTER_MUTATION, {
        onCompleted: () => {
            openAlert();
        },
        onError: handleErrors
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        register({
            variables: { input: { name, email, password, password_confirmation, callbackUrl } }
        });
    };


    return (
        <>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="username"
                        placeholder="John Doe"
                        autoComplete="on"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="email"
                        placeholder="johndoe@example.com"
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


                {Object.values(errors).length > 0 && <ValidationError errors={Object.values(errors)} />}

                <button type="submit" className="w-full bg-blue-600 text-gray-100  py-2 px-3 rounded  hover:bg-blue-800 hover:text-gray-100">
                    Register
                </button>

                <p className="text-md font-light text-gray-500 dark:text-gray-600">
                    Already have an account? &nbsp;
                    <button className="font-medium text-primary-600 hover:underline dark:text-primary-700">
                        <NavLink to="/login">
                            Login
                        </NavLink >
                    </button>
                </p>
            </form>

            <Alert
                isOpen={isOpenAlert}
                title="Success"
                message="Your account has been created successfully. An email has been sent to verify your account."
                onClose={closeAlert}
            />
        </>
    );
};


export default RegisterForm