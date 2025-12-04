import { useTranslation } from 'react-i18next';
import { Text } from '#/shared/ui/Text/Text';
import { Profile } from '../../model/types/profile.types';
import classes from './ProfileCard.module.scss';
import { Heading } from '#/shared/ui/Heading/Heading';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Avatar } from '#/shared/ui/Avatar/Avatar';
import { TextCopiable } from '#/widgets/TextCopiable';

interface ProfileCardProps {
    profile: Profile;
}

export const ProfileCardСontent = ({ profile }: ProfileCardProps) => {
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
            <Avatar
                size={196}
                src={profile.photo}
                alt={`${profile.name} ${profile.surname}`}
            />
        </div>
    );
};
