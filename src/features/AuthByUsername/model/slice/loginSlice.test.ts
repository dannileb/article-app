import { LoginSchema } from '../types/loginSchema';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { loginActions, loginReducer } from '../slice/loginSlice';

describe('loginSlice.test', () => {
    test('should should set username', () => {
        const username = 'test';
        const state: DeepPartial<LoginSchema> = {};
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername(username),
            ),
        ).toEqual({ username });
    });
    test('should should set password', () => {
        const password = 'test';
        const state: DeepPartial<LoginSchema> = {};
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword(password),
            ),
        ).toEqual({ password });
    });
});
