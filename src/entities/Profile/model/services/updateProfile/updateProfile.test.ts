import { updateProfile } from './updateProfile';
import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';
import { $api } from '#/shared/api/api';
import { Profile } from '#/entities/Profile';

jest.mock('#/shared/api/api');
const mockedAxios = jest.mocked($api);

const mockUser: Profile = {
    id: '1',
    username: 'test',
    name: 'test',
    surname: 'test',
    photo: 'test',
    age: 1,
    country: 'test',
    city: 'test',
    currency: 'test',
};
const rejectedMessage = {
    message: 'unknown',
};

describe('updateProfile.test', () => {
    test('should return authError: localStorage does not have token', async () => {
        const thunk = new TestAsyncThunk(updateProfile, {
            profile: {
                form: mockUser,
            },
        });

        thunk.api.put.mockRejectedValue(rejectedMessage);
        const result = await thunk.callThunk(undefined);

        expect(mockedAxios.put).toHaveBeenCalledWith('/profile/1', {
            ...mockUser,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual(rejectedMessage);
    });

    test('should return profile', async () => {
        const thunk = new TestAsyncThunk(updateProfile, {
            profile: {
                form: mockUser,
            },
        });

        thunk.api.put.mockResolvedValue({ data: mockUser });
        const result = await thunk.callThunk(undefined);

        expect(mockedAxios.put).toHaveBeenCalledWith('/profile/1', {
            ...mockUser,
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockUser);
    });
});
