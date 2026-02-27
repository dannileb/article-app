import { Heading } from '#/shared/ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { memo } from 'react';
import { Loader } from '#/shared/ui/Loader/Loader';
import classes from './NotificationsList.module.scss';
import { Notification } from '../../model/types/Notification.types';

interface NotificationsListProps {
    notifications: Notification[];
    isLoading: boolean;
}

const NotificationsListInner = ({
    notifications,
    isLoading,
}: NotificationsListProps) => {
    const { t } = useTranslation();

    return (
        <div className={classes.notificationsWrapper}>
            <Heading level={4}>{t('notifications')}</Heading>
            <div
                className={classes.notifications}
                data-testid="NotificationsList.List"
            >
                {isLoading && <Loader />}
                {notifications?.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                    />
                ))}
            </div>
        </div>
    );
};

export const NotificationsList = memo(NotificationsListInner);
