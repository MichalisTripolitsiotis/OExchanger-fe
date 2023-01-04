// @ts-nocheck
import Cookies from 'universal-cookie'
import { createContext, useReducer } from 'react';

const initialState = {
    user: null
}

const cookies = new Cookies();
let authToken = cookies.get('authToken');

if (authToken) {
    initialState.user = authToken;
}

const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
});

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

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
        <AuthContext.Provider value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider };