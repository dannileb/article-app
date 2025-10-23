import { getProfile } from './getProfile';
import { Profile } from '../../types/profile.types';
import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';
import { $api } from '#/shared/api/api';

jest.mock('#/shared/api/api');
const mockedAxios = jest.mocked($api);

describe('getProfile.test', () => {
    test('should return authError: localStorage does not have token', async () => {
        const thunk = new TestAsyncThunk(getProfile);
        const result = await thunk.callThunk({ profileId: '1' });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({ message: 'errors.unknown' });
    });

    test('should return profile', async () => {
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
        mockedAxios.get.mockResolvedValue({ data: mockUser });

        const thunk = new TestAsyncThunk(getProfile);
        const result = await thunk.callThunk({ profileId: '1' });

        expect(mockedAxios.get).toHaveBeenCalledWith('/profile/1');
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockUser);
    });
});
