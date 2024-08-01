import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api',
    baseURL: 'http://localhost:8000/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    origin: true,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'Cookie',
    proxy: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 8000
    },
});

export default instance;