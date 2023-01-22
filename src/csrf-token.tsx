import { axiosInstance } from './axios-client/axios-client';
import Cookies from 'universal-cookie';

export async function requestCSRFToken() {
    await axiosInstance.get('/sanctum/csrf-cookie');
}

export async function getCSRFToken() {
    await requestCSRFToken();
    const cookies = new Cookies();
    let token: any = cookies.get('XSRF-TOKEN');
    return decodeURIComponent(token);
}