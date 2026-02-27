import { Notification } from '../../model/types/Notification.types';
import { Heading } from '#/shared/ui/Heading/Heading';
import { Card } from '#/shared/ui/Card/Card';
import { Fragment } from 'react';
import { AppLink } from '#/shared/ui/AppLink/AppLink';
import { Text } from '#/shared/ui/Text/Text';
import classes from './NotificationItem.module.scss';
import { convertTimestamp } from '#/shared/lib/date';

interface NotificationItemProps {
    notification: Notification;
}

export const NotificationItem = ({ notification }: NotificationItemProps) => {
    const Wrapper = !notification.href ? Fragment : AppLink;
    return (
        <Wrapper to={notification.href ?? ''} target="_blank">
            <Card>
                <div className={classes.notification}>
                    <div className={classes.notificationTitle}>
                        <Heading level={5}>{notification.title}</Heading>
                        <Text
                            size="s"
                            view="secondary"
                            className={classes.notificationDate}
                        >
                            {convertTimestamp(
                                Number(notification.sendAt),
                                true,
                            )}
                        </Text>
                    </div>
                    <Text size="s">{notification.description}</Text>
                </div>
            </Card>
        </Wrapper>
    );
};
