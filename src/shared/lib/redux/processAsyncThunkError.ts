import { ResponseError } from '#/shared/types/Axios';
import { GetThunkAPI } from '@reduxjs/toolkit';
import axios from 'axios';

type ThunkApi = GetThunkAPI<{ rejectValue: ResponseError }>;

export function processAsyncThunkError(error: unknown, thunkApi: ThunkApi) {
    if (axios.isAxiosError<ResponseError>(error)) {
        const axiosError = error;

        return thunkApi.rejectWithValue({
            message: axiosError.response?.data?.message ?? 'errors.unknown',
        });
    }

    return thunkApi.rejectWithValue({
        message: 'errors.unknown',
    });
}
