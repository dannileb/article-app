import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import axios from 'axios';

export const $api = axios.create({
    baseURL: __API__,
    headers: {
        Authorization: localStorage.getItem(ACCESS_TOKEN_KEY)
            ? 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY)
            : undefined,
    },
});
