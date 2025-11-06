import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { getUserIsAuth } from './getUserIsAuth';

describe('getUserIsAuth.test', () => {
    it('should return state', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                isAuthenticated: true,
            },
        };

        expect(getUserIsAuth(state as StateSchema)).toBe(true);
    });
});
