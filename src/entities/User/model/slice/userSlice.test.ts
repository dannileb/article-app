import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import { setupLocalStorageMock } from '#/shared/lib/tests/mockLocalStorage';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { userActions, userReducer } from '../slice/userSlice';
import { User, UserSchema } from '../types/user.types';

describe('userSlice.test', () => {
    beforeAll(() => {
        setupLocalStorageMock();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should should set authData', () => {
        const authData: User = {
            id: 1,
            name: 'test',
            username: 'test',
            role: 'test',
        };
        const state: DeepPartial<UserSchema> = {};
        expect(
            userReducer(state as UserSchema, userActions.setAuthData(authData)),
        ).toEqual({ authData });
    });
    test('should should logout', () => {
        const state: DeepPartial<UserSchema> = {};
        expect(userReducer(state as UserSchema, userActions.logout())).toEqual({
            authData: undefined,
        });
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(
            ACCESS_TOKEN_KEY,
        );
    });
});
