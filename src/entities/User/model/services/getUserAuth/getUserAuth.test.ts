import axios from 'axios';
import { getUserAuth } from './getUserAuth';
import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import { User } from '../../types/user.types';
import { TestAsyncThunkWithLocalStorage } from '#/shared/lib/tests/TestAsyncThunkWithLocalStorage';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getUserAuth.test', () => {
    test('should return undefined: localStorage does not have token', async () => {
        const thunk = new TestAsyncThunkWithLocalStorage(getUserAuth);
        const result = await thunk.callThunk();
        thunk.localStorageMock.getItem.mockReturnValueOnce(null);

        expect(thunk.localStorageMock.getItem).toHaveBeenCalledWith(
            ACCESS_TOKEN_KEY,
        );
        expect(mockedAxios.get).not.toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toBeUndefined();
    });

    test('should return auth data', async () => {
        const mockToken = 'token';
        const mockUser: User = {
            id: 1,
            username: 'test',
            name: 'test',
            role: 'test',
        };
        mockedAxios.get.mockResolvedValue({ data: mockUser });

        const thunk = new TestAsyncThunkWithLocalStorage(getUserAuth);
        thunk.localStorageMock.getItem.mockReturnValueOnce(mockToken);
        const result = await thunk.callThunk();

        expect(thunk.localStorageMock.getItem).toHaveBeenCalledWith(
            ACCESS_TOKEN_KEY,
        );
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'http://localhost:8000/api/me',
            {
                headers: {
                    Authorization: `Bearer ${mockToken}`,
                },
            },
        );
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockUser);
    });

    test('should return error', async () => {
        const mockToken = 'token';
        const mockError = { message: 'errors.unknown' };
        mockedAxios.get.mockRejectedValue(mockError);

        const thunk = new TestAsyncThunkWithLocalStorage(getUserAuth);
        thunk.localStorageMock.getItem.mockReturnValueOnce(mockToken);
        const result = await thunk.callThunk();

        expect(thunk.localStorageMock.getItem).toHaveBeenCalledWith(
            ACCESS_TOKEN_KEY,
        );
        expect(mockedAxios.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual(mockError);
    });
});
