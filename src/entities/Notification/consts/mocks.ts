import { Notification } from '../model/types/Notification.types';

const NEW_NOTIF_TIMESPAMP = 1772396485;
const NOTIF_TIMESPAMP = NEW_NOTIF_TIMESPAMP - 10000;
export const LAST_SEEN_TIMESTAMP = NEW_NOTIF_TIMESPAMP - 500;

export const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'Old notification',
        description: 'desc',
        userId: 'user-1',
        href: '/articles/1',
        sendAt: String(NEW_NOTIF_TIMESPAMP),
    },
    {
        id: '2',
        title: 'New notification',
        description: 'desc',
        userId: 'user-1',
        href: '/articles/2',
        sendAt: String(NOTIF_TIMESPAMP),
    },
    {
        id: '3',
        title: 'New notification',
        description: 'desc',
        userId: 'user-1',
        href: '/articles/3',
        sendAt: String(NOTIF_TIMESPAMP),
    },
];
