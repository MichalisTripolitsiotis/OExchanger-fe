// @ts-nocheck
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import { getCSRFToken } from '../csrf-token';

let csrfToken = await getCSRFToken();

const token = Cookies.get('token');
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const httpLink = new HttpLink({
    uri: 'http://localhost/graphql/',
    headers: {
        "X-XSRF-TOKEN": csrfToken,
    },
    credentials: 'include',
});


let client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;