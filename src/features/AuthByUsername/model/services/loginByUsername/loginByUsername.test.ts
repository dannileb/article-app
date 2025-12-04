import { loginByUsername } from './loginByUsername';
import { userActions } from '#/entities/User';
import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';
import { TestAsyncThunkWithLocalStorage } from '#/shared/lib/tests/TestAsyncThunkWithLocalStorage';
import { $api } from '#/shared/api/api';

jest.mock('#/shared/api/api');
const mockedAxios = jest.mocked($api);

describe('loginByUsername.test', () => {
    test('login should be successed: token saved and dispathc setAuthData have been called', async () => {
        const userPayload = {
            user: {
                id: '1',
                username: 'test',
                name: 'Test User',
                role: 'user',
            },
            accessToken: 'jwt-token',
        };
        mockedAxios.post.mockResolvedValue({ data: userPayload });

        const thunk = new TestAsyncThunkWithLocalStorage(loginByUsername);
        const result = await thunk.callThunk({
            username: 'test',
            password: '123',
        });

        expect(mockedAxios.post).toHaveBeenCalledWith('/login', {
            username: 'test',
            password: '123',
        });

        expect(window.localStorage.setItem).toHaveBeenCalledWith(
            ACCESS_TOKEN_KEY,
            userPayload.accessToken,
        );

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userPayload.user),
        );
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userPayload);
    });

    test('login should be failed: dispatch rejected with error message', async () => {
        const errorResponse = { message: 'unknown' };
        mockedAxios.post.mockRejectedValue({
            response: { data: errorResponse },
        });

        const thunk = new TestAsyncThunkWithLocalStorage(loginByUsername);
        const result = await thunk.callThunk({
            username: 'test',
            password: '123',
        });

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual(errorResponse);

        expect(window.localStorage.setItem).not.toHaveBeenCalled();
        expect(thunk.dispatch).not.toHaveBeenCalledWith(
            expect.objectContaining({
                type: userActions.setAuthData.type,
            }),
        );
    });

    test('login should be failed: dispatch rejected with unknown error', async () => {
        mockedAxios.post.mockRejectedValue(new Error('Network Error'));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({
            username: 'test',
            password: '123',
        });

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({ message: 'unknown' });
    });
});
