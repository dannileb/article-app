import { useTranslation } from 'react-i18next';
import { Text } from '#/shared/ui/Text/Text';
import { Profile } from '../../model/types/profile.types';
import classes from '../ProfilePage.module.scss';
import { Heading } from '#/shared/ui/Heading/Heading';
import { TextCopiable } from '#/shared/ui/TextCopiable/TextCopiable';
import { EnvironmentOutlined } from '@ant-design/icons';

interface ProfileCardProps {
    profile: Profile;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
    const { t } = useTranslation('profile');

    return (
        <div className={classes.card}>
            <div className={classes.info}>
                <div className={classes.nameWrapper}>
                    <Heading level={2}>
                        {profile.name} {profile.surname}
                    </Heading>
                </div>
                <TextCopiable monospace copyingText={profile.username}>
                    @{profile.username}
                </TextCopiable>
                <Text>
                    <EnvironmentOutlined /> {profile.country}, {profile.city}
                </Text>
                <Text>
                    {t('age')}: {profile.age}
                </Text>
                <Text>
                    {t('currency')}: {profile.currency}
                </Text>
            </div>
            <div className={classes.photoWrapper}>
                <source />
                <img
                    className={classes.photo}
                    src={profile.photo}
                    alt="profile_photo"
                />
            </div>
        </div>
    );
};
