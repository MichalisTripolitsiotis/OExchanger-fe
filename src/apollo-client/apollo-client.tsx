// @ts-nocheck
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'universal-cookie';
import { getCSRFToken } from '../csrf-token';

let csrfToken = await getCSRFToken();

const cookies = new Cookies();
const authToken = cookies.get('authToken');
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: authToken ? `Bearer ${authToken}` : "",
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