import { AxiosError, AxiosResponse } from 'axios';
import { processAsyncThunkError } from './processAsyncThunkError';
import { ResponseError } from '#/shared/types/Axios';

describe('processAsyncThunkError.test', () => {
    let rejectWithValueMock = jest.fn();

    beforeEach(() => {
        rejectWithValueMock = jest.fn();
    });

    it('should process axios error', () => {
        const errorMessage = 'test error';

        const axiosError = new AxiosError(
            undefined,
            undefined,
            undefined,
            undefined,
            {
                data: {
                    message: errorMessage,
                },
            } as AxiosResponse<ResponseError>,
        );
        processAsyncThunkError(axiosError, rejectWithValueMock);
        expect(rejectWithValueMock).toHaveBeenCalledWith({
            message: errorMessage,
        });
    });

    it('should process not axios error', () => {
        processAsyncThunkError(new Error('test error'), rejectWithValueMock);
        expect(rejectWithValueMock).toHaveBeenCalledWith({
            message: 'unknown',
        });
    });
});
