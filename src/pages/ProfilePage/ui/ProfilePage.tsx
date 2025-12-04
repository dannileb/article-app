import { useParams } from 'react-router';
import { ProfileCard } from '#/entities/Profile';

function ProfilePage() {
    const { profileId } = useParams();

    return <ProfileCard profileId={profileId} editable />;
}

export default ProfilePage;
