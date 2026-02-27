import { notificationActions, notificationReducer } from './notificationSlice';
import { NotificationSchema } from '../../model/types/Notification.types';
import { LAST_SEEN_NOTIF_KEY } from '#/shared/consts/localStorage';
import { setupLocalStorageMock } from '#/shared/lib/tests/mockLocalStorage';
import { DeepPartial } from '#/shared/types/DeepPartial.types';

describe('notificationSlice.test', () => {
    beforeAll(() => {
        setupLocalStorageMock();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should markAsSeen', () => {
        const state: DeepPartial<NotificationSchema> = {
            lastSeen: 0,
        };
        const newLastSeenDate = Date.now();
        expect(
            notificationReducer(
                state as NotificationSchema,
                notificationActions.markAsSeen(newLastSeenDate),
            ),
        ).toEqual({
            lastSeen: newLastSeenDate,
        });
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
            LAST_SEEN_NOTIF_KEY,
            String(newLastSeenDate),
        );
    });
});
