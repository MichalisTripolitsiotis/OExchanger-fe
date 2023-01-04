import { axiosInstance } from './axios-client/axios-client';
import Cookies from 'js-cookie';

export async function requestCSRFToken() {
    await axiosInstance.get('/sanctum/csrf-cookie');
}

export async function getCSRFToken() {
    await requestCSRFToken();
    let token: any = Cookies.get('XSRF-TOKEN');
    return decodeURIComponent(token);
}