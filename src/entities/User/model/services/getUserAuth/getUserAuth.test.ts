import { getUserAuth } from './getUserAuth';
import { User } from '../../types/user.types';
import { $api } from '#/shared/api/api';
import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';

jest.mock('#/shared/api/api');
const mockedAxios = jest.mocked($api);

describe('getUserAuth.test', () => {
    test('should return error: localStorage does not have token', async () => {
        const thunk = new TestAsyncThunk(getUserAuth);
        const result = await thunk.callThunk(undefined);

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({ message: 'unknown' });
    });

    test('should return auth data', async () => {
        const mockUser: User = {
            id: '1',
            username: 'test',
            role: 'test',
        };
        mockedAxios.get.mockResolvedValue({ data: mockUser });

        const thunk = new TestAsyncThunk(getUserAuth);
        const result = await thunk.callThunk(undefined);

        expect(mockedAxios.get).toHaveBeenCalledWith('/me');

        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockUser);
    });
});
