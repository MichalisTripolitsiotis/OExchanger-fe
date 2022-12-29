import axios from 'axios';
import Cookies from 'js-cookie'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    withCredentials: true,
});

export function getCSRFToken() {
    let token: any = Cookies.get('XSRF-TOKEN');

    if (!token) {
        csrfProtectionRequest();
        token = Cookies.get('XSRF-TOKEN');
    }

    return decodeURIComponent(token);

}

async function csrfProtectionRequest() {
    axiosInstance.get('/sanctum/csrf-cookie');
}