import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import axios from 'axios';

const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export { $api };
