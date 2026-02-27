import { getNotificationsLastSeen } from './notificationSelectors';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { setupLocalStorageMock } from '#/shared/lib/tests/mockLocalStorage';

describe('notificationSelectors.test', () => {
    beforeAll(() => {
        setupLocalStorageMock();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
    it('should return lastSeen', () => {
        const state: DeepPartial<StateSchema> = {
            notification: {
                lastSeen: 123456789,
            },
        };

        expect(getNotificationsLastSeen(state as StateSchema)).toEqual(
            123456789,
        );
    });
});
