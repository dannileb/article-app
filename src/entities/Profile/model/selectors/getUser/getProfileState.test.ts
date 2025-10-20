import { Profile } from '../../types/profile.types';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { getProfileState } from './getProfileState';

describe('getProfileState.test', () => {
    it('should return state', () => {
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
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: mockUser,
                isLoading: true,
            },
        };
        const { data, isLoading } = getProfileState(state as StateSchema) ?? {};
        expect(isLoading).toBe(true);
        Object.keys(mockUser).forEach((key) => {
            expect(data?.[key as keyof Profile]).toBe(
                mockUser[key as keyof Profile],
            );
        });
    });

    it('should return undefined if state is undefined', () => {
        const state = {};
        expect(getProfileState(state as StateSchema)).toBe(undefined);
    });
});
