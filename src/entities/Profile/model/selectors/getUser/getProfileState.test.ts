import { Profile } from '../../types/profile.types';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { getProfileData } from './getProfileData';
import { getProfileIsLoading } from './getProfileIsLoading';

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
        const data = getProfileData(state as StateSchema) ?? {};
        const isLoading = getProfileIsLoading(state as StateSchema);
        expect(isLoading).toBe(true);
        expect(data).toEqual(mockUser);
    });

    it('should return undefined if state is undefined', () => {
        const state = {};
        expect(getProfileData(state as StateSchema)).toBe(undefined);
    });
});
