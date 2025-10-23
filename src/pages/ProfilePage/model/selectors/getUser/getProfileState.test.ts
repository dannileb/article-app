import { Profile } from '../../types/profile.types';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { getProfileData } from './getProfileData';
import { getProfileIsLoading } from './getProfileIsLoading';
import { getProfileError } from '#/pages/ProfilePage/model/selectors/getUser/getProfileError';
import { getProfileIsReadonly } from '#/pages/ProfilePage/model/selectors/getUser/getProfileIsReadonly';
import { getProfileIsUpdateLoading } from '#/pages/ProfilePage/model/selectors/getUser/getProfileIsUpdateLoading';
import { getProfileForm } from '#/pages/ProfilePage/model/selectors/getUser/getProfileForm';
import { getProfileUpdateError } from '#/pages/ProfilePage/model/selectors/getUser/getProfileUpdateError';

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
                form: mockUser,
                isLoading: true,
                error: 'test',
                readonly: true,
                isUpdateLoading: true,
                updateError: 'test',
            },
        };

        expect(getProfileIsLoading(state as StateSchema)).toBe(true);
        expect(getProfileError(state as StateSchema)).toBe('test');
        expect(getProfileIsReadonly(state as StateSchema)).toBe(true);
        expect(getProfileIsUpdateLoading(state as StateSchema)).toBe(true);
        expect(getProfileForm(state as StateSchema)).toEqual(mockUser);
        expect(getProfileUpdateError(state as StateSchema)).toBe('test');
        expect(getProfileData(state as StateSchema) ?? {}).toEqual(mockUser);
    });

    it('should return undefined if state is undefined', () => {
        const state = {};
        expect(getProfileData(state as StateSchema)).toBe(undefined);
    });
});
