import { NotificationsList } from '../NotificationsList/NotificationsList';
import { Button } from '#/shared/ui/Button/Button';
import { Popover } from '#/shared/ui/Popups';
import { BellOutlined } from '@ant-design/icons';
import { memo, useCallback } from 'react';
import { useGetNotificationsQuery } from '../../api/notificationApi';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { notificationActions } from '../../model/slice/notificationSlice';
import { getNotificationsLastSeen } from '../../model/selectors/notificationSelectors';

const NotificationsButtonInner = () => {
    const dispatch = useAppDispatch();
    const lastSeen = useAppSelector(getNotificationsLastSeen);

    const { data: notifications, isLoading } = useGetNotificationsQuery(
        undefined,
        {
            pollingInterval: __PROJECT__ === 'jest' ? undefined : 5000,
        },
    );

    const newNotificationsCount =
        notifications?.filter(
            (notification) => Number(notification.sendAt) > lastSeen,
        ).length ?? 0;

    const handleOpen = useCallback(() => {
        dispatch(notificationActions.markAsSeen(Date.now()));
    }, [dispatch]);

    return (
        <Popover
            direction="bottomLeft"
            trigger={
                <Button
                    view="clear"
                    icon={<BellOutlined />}
                    onClick={handleOpen}
                    data-testid="NotificationsButton.OpenButton"
                >
                    {newNotificationsCount > 0 && newNotificationsCount}
                </Button>
            }
        >
            <NotificationsList
                notifications={notifications ?? []}
                isLoading={isLoading}
            />
        </Popover>
    );
};

export const NotificationsButton = memo(NotificationsButtonInner);
