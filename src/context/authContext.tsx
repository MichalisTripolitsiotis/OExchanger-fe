// @ts-nocheck
import Cookies from 'js-cookie'
import { createContext, useReducer } from 'react';

const initialState = {
    user: null
}

if (Cookies.get('token')) {
    const decodedToken = Cookies.get('token');
    //console.log(decodedToken);
    initialState.user = decodedToken;
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
        Cookies.set("token", userData.login, { HttpOnly: true });
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
        Cookies.remove("token");
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider };