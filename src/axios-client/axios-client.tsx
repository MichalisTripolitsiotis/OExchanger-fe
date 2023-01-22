import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    withCredentials: true,
});