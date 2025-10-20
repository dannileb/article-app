import axios from 'axios';
import { getProfile } from './getProfile';
import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import { Profile } from '../../types/profile.types';
import { TestAsyncThunkWithLocalStorage } from '#/shared/lib/tests/TestAsyncThunkWithLocalStorage';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getProfile.test', () => {
    test('should return undefined: localStorage does not have token', async () => {
        const thunk = new TestAsyncThunkWithLocalStorage(getProfile);
        const result = await thunk.callThunk();
        thunk.localStorageMock.getItem.mockReturnValueOnce(null);

        expect(thunk.localStorageMock.getItem).toHaveBeenCalledWith(
            ACCESS_TOKEN_KEY,
        );
        expect(mockedAxios.get).not.toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toBeUndefined();
    });

    test('should return profile', async () => {
        const mockToken = 'token';
        const mockUser: Profile = {
            id: 1,
            username: 'test',
            name: 'test',
            surname: 'test',
            photo: 'test',
            age: 1,
            country: 'test',
            city: 'test',
            currency: 'test',
        };
        mockedAxios.get.mockResolvedValue({ data: mockUser });

        const thunk = new TestAsyncThunkWithLocalStorage(getProfile);
        thunk.localStorageMock.getItem.mockReturnValueOnce(mockToken);
        const result = await thunk.callThunk();

        expect(thunk.localStorageMock.getItem).toHaveBeenCalledWith(
            ACCESS_TOKEN_KEY,
        );
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'http://localhost:8000/api/profile',
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

        const thunk = new TestAsyncThunkWithLocalStorage(getProfile);
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
