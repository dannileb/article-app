import { Notification } from '../model/types/Notification.types';
import { rtkQueryApi } from '#/shared/api/api';

export const notificationApi = rtkQueryApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], void>({
            query: () => ({
                url: '/notifications',
                method: 'GET',
            }),
            providesTags: () => [{ type: 'Notification' }],
        }),
    }),
});

export const { useGetNotificationsQuery } = notificationApi;
