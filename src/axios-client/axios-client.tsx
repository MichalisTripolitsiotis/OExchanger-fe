import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    xsrfHeaderName: 'X-XSRF-TOKEN',
    withCredentials: true,
});