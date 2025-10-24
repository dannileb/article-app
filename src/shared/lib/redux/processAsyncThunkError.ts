import { ResponseError } from '#/shared/types/Axios';
import { GetThunkAPI } from '@reduxjs/toolkit';
import axios from 'axios';

type RejectWithValueFuncType = GetThunkAPI<{
    rejectValue: ResponseError;
}>['rejectWithValue'];

export function processAsyncThunkError(
    error: unknown,
    rejectWithValue: RejectWithValueFuncType,
) {
    if (axios.isAxiosError<ResponseError>(error)) {
        const axiosError = error;

        return rejectWithValue({
            message: axiosError.response?.data?.message ?? 'unknown',
        });
    }

    return rejectWithValue({
        message: 'unknown',
    });
}
