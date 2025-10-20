import { profileReducer } from '#/entities/Profile';
import { useReducerManager } from '#/shared/lib/hooks/useReducerManager';
import { useTranslation } from 'react-i18next';

const initialRedusers = { profile: profileReducer };

function ProfilePage() {
    useReducerManager(initialRedusers);
    const { t } = useTranslation();
    return <div>{t('profile_text')}</div>;
}

export default ProfilePage;
