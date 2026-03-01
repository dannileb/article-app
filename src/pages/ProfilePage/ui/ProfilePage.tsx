import { useParams } from 'react-router';
import { ProfileCard } from '#/entities/Profile';
import classes from './ProfilePage.module.scss';
import { ProfileRating } from '#/features/ProfileRating';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getUser } from '#/entities/User';

function ProfilePage() {
    const { profileId } = useParams();
    const userData = useAppSelector(getUser);

    if (!profileId) {
        return null;
    }

    return (
        <div className={classes.pageContainer}>
            <ProfileCard profileId={profileId} editable />
            {userData && userData.authData?.id !== profileId && (
                <ProfileRating profileId={profileId} />
            )}
        </div>
    );
}

export default ProfilePage;
