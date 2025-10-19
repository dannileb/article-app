import { getLoginForm } from './getLoginState';
import { DeepPartial } from '#/shared/types/DeepPartial.types';

describe('getLoginState.test', () => {
    it('should return state', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                username: 'test',
                password: 'test',
                isLoading: true,
            },
        };
        expect(getLoginForm(state as StateSchema)?.isLoading).toBe(true);
        expect(getLoginForm(state as StateSchema)?.username).toBe('test');
        expect(getLoginForm(state as StateSchema)?.password).toBe('test');
    });

    it('should return undefined if state is undefined', () => {
        const state = {};
        expect(getLoginForm(state as StateSchema)).toBe(undefined);
    });
});
