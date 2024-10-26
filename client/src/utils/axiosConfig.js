import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    origin: true,
    withCredentials: true,
    xsrfHeaderName: 'x-csrftoken',
    xsrfCookieName: 'csrftoken',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-csrftoken, Access-Control-Expose-Headers',
        'Access-Control-Expose-Headers': 'x-csrftoken'
    },
    proxy: {
        protocol: 'http',
        host: 'localhost',
        port: 8000
    },
});

instance.interceptors.request.use(
    function (config){
        const csrftoken = sessionStorage.getItem('csrftoken');
        if (csrftoken) {
            config.headers = { 'x-csrftoken': csrftoken };
        }
        return config;
    },
    function (error) {
        return Promise.reject (error);
    }
)

export default instance;