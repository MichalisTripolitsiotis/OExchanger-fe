import React, { createContext, useState, useEffect } from 'react';
import { ME } from '../graphql/authentication/queries';
import { useCookies } from "react-cookie";
import { useApolloClient } from '@apollo/client';

interface AuthContextProps {
    token: string | null,
    loading: boolean,
    isAuthenticated: boolean,
    setAuthenticated: (authenticationToken: string) => void,
    logout: () => void,
}

const TOKEN_NAME = "authToken";

const AuthContext = createContext<AuthContextProps>({
    token: null,
    loading: true,
    isAuthenticated: false,
    setAuthenticated: (authenticationToken: string) => { },
    logout: () => { },
});

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);
    const client = useApolloClient();

    useEffect(() => {
        const token = cookies[TOKEN_NAME];

        if (token) {
            const fetchUser = async () => {
                try {
                    const { data } = await client.query({
                        query: ME,
                        fetchPolicy: 'network-only',
                    });

                    const me = data?.me;
                    console.log(me);
                    if (me) {
                        setIsAuthenticated(true);
                        setToken(token);
                        setLoading(false);
                    } else {
                        setIsAuthenticated(false);
                        setLoading(false);
                    }
                } catch (error) {
                    setIsAuthenticated(false);
                    setLoading(false);
                }
            };

            fetchUser();
        } else {
            setLoading(false);
        }
    }, [cookies, client]);

    const setAuthenticated = (authenticationToken: string) => {
        console.log(authenticationToken);
        setCookie(TOKEN_NAME, authenticationToken, {
            path: "/",
            httpOnly: false, // set to true
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30
        });
        setIsAuthenticated(true);
        setLoading(true);
    };

    const logout = () => {
        removeCookie(TOKEN_NAME);
        client.clearStore();
        client.resetStore();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                loading,
                isAuthenticated,
                setAuthenticated,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };