import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { getProfileData } from './getProfileData';
import { getProfileIsLoading } from './getProfileIsLoading';
import { getProfileError } from '#/pages/ProfilePage/model/selectors/getProfile/getProfileError';
import { getProfileIsReadonly } from '#/pages/ProfilePage/model/selectors/getProfile/getProfileIsReadonly';
import { getProfileIsUpdateLoading } from '#/pages/ProfilePage/model/selectors/getProfile/getProfileIsUpdateLoading';
import { getProfileForm } from '#/pages/ProfilePage/model/selectors/getProfile/getProfileForm';
import { getProfileUpdateError } from '#/pages/ProfilePage/model/selectors/getProfile/getProfileUpdateError';
import { getProfileIsEditing } from '#/pages/ProfilePage/model/selectors/getProfile/getProfileIsEditing';
import { Profile } from '#/entities/Profile';

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
                isEditing: true,
            },
        };

        expect(getProfileData(state as StateSchema)).toEqual(mockUser);
        expect(getProfileError(state as StateSchema)).toBe('test');
        expect(getProfileForm(state as StateSchema)).toEqual(mockUser);
        expect(getProfileIsEditing(state as StateSchema)).toBe(true);
        expect(getProfileIsLoading(state as StateSchema)).toBe(true);
        expect(getProfileIsReadonly(state as StateSchema)).toBe(true);
        expect(getProfileIsUpdateLoading(state as StateSchema)).toBe(true);
        expect(getProfileUpdateError(state as StateSchema)).toBe('test');
    });

    it('should return undefined if state is undefined', () => {
        const state = {};
        expect(getProfileData(state as StateSchema)).toBe(undefined);
        expect(getProfileError(state as StateSchema)).toBe(undefined);
        expect(getProfileForm(state as StateSchema)).toBe(undefined);
        expect(getProfileIsEditing(state as StateSchema)).toBe(undefined);
        expect(getProfileIsLoading(state as StateSchema)).toBe(undefined);
        expect(getProfileIsReadonly(state as StateSchema)).toBe(undefined);
        expect(getProfileIsUpdateLoading(state as StateSchema)).toBe(undefined);
        expect(getProfileUpdateError(state as StateSchema)).toBe(undefined);
    });
});
