import { getUserAuth } from '../services/getUserAuth/getUserAuth';
import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import { setupLocalStorageMock } from '#/shared/lib/tests/mockLocalStorage';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { userActions, userReducer } from '../slice/userSlice';
import { User, UserSchema } from '../types/user.types';

const mockAuthData: User = {
    id: '1',
    username: 'test',
    role: 'test',
};

describe('userSlice.test', () => {
    beforeAll(() => {
        setupLocalStorageMock();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should should set authData', () => {
        const state: DeepPartial<UserSchema> = {};
        expect(
            userReducer(
                state as UserSchema,
                userActions.setAuthData(mockAuthData),
            ),
        ).toEqual({
            authData: mockAuthData,
            isAuthenticated: true,
        });
    });
    test('should resolve auth request', () => {
        const initState: DeepPartial<UserSchema> = {
            isAuthenticated: false,
            isLoading: true,
            authData: undefined,
        };

        const { isAuthenticated, isLoading, authData } = userReducer(
            initState as UserSchema,
            {
                type: getUserAuth.fulfilled.type,
                payload: mockAuthData,
            },
        );

        expect(isAuthenticated).toBe(true);
        expect(isLoading).toBe(false);
        expect(authData).toEqual(mockAuthData);
    });
    test('should should logout', () => {
        const state: DeepPartial<UserSchema> = {};
        expect(userReducer(state as UserSchema, userActions.logout())).toEqual({
            authData: undefined,
            isAuthenticated: false,
        });
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(
            ACCESS_TOKEN_KEY,
        );
    });
});
