import axios from 'axios';
import { getCsrfToken } from './utility';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    origin: true,
    withCredentials: true,
    xsrfHeaderName: 'x-csrftoken',
    xsrfCookieName: 'csrftoken',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-csrftoken, Access-Control-Expose-Headers',
        'Access-Control-Expose-Headers': 'x-csrftoken',
        'x-csrftoken': getCsrfToken()
    },
    proxy: {
        protocol: 'http',
        host: 'localhost',
        port: 8000
    },
});

export default instance;