// @ts-nocheck
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { getCSRFToken } from '../csrf-token';
import { Cookies } from 'react-cookie';
import { setContext } from '@apollo/client/link/context';

let csrfToken = await getCSRFToken();

const cookies = new Cookies();
let authToken = cookies.get('authToken');
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: authToken ? `Bearer ${authToken}` : "",
        }
    }
});

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
    headers: {
        "X-XSRF-TOKEN": csrfToken,
    },
    credentials: 'include',
});

const cache = new InMemoryCache({});


let client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
});

export default client;