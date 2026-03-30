import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const __API__ =
    __BUNDLER__ === 'vite'
        ? import.meta.env.VITE_API_URL
        : process.env.WEBPACK_API_URL;

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

const rtkQueryApi = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(ACCESS_TOKEN_KEY);

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['Comment', 'Notification', 'ArticleRating', 'ProfileRating'],
});

export { $api, rtkQueryApi };
