// @ts-nocheck
import Cookies from 'universal-cookie'
import { createContext, useReducer, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { ME } from '../graphql/authentication/queries';

const initialState = {
    token: null
}

const cookies = new Cookies();
let authToken = cookies.get('authToken');

if (authToken) {
    initialState.token = authToken;
}

const AuthContext = createContext({
    token: null,
    isAuthenticated: false,
    login: (userData) => { },
    logout: () => { }
});

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true
            }
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                isAuthenticated: false
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const client = useApolloClient();
    useEffect(() => {
        const fetchUser = async () => {
            if (authToken) {
                await client.query({
                    query: ME,
                    fetchPolicy: "no-cache"
                }).then(response => {
                    if (response.data.me === null) {
                        logout();
                    }
                });
            }
        }

        fetchUser();
    }, [client]);

    const login = (userData) => {
        cookies.set("authToken", userData.login, {
            path: "/",
            httpOnly: false, // set to true
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30
        });
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
        cookies.remove("authToken");
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider value={{ token: state.token, isAuthenticated: state.isAuthenticated, login, logout }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider };