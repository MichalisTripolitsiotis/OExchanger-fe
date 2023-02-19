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
    uri: 'http://localhost/graphql/',
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

client.onClearStore(
    () =>
        new Promise<any>((resolve) => {
            cookies.remove('authToken');
            authToken = null;
            resolve(true);
        })
);
export default client;