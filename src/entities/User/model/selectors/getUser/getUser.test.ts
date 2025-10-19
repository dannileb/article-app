import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { getUser } from './getUser';

describe('getUser.test', () => {
    it('should return state', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    id: 1,
                    username: 'test',
                    name: 'test',
                    role: 'test',
                },
                isLoading: true,
            },
        };
        const { authData, isLoading } = getUser(state as StateSchema);
        expect(isLoading).toBe(true);
        expect(authData?.id).toBe(1);
        expect(authData?.username).toBe('test');
        expect(authData?.name).toBe('test');
        expect(authData?.role).toBe('test');
    });

    it('should return undefined if state is undefined', () => {
        const state = {};
        expect(getUser(state as StateSchema)).toBe(undefined);
    });
});
