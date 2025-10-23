import { profileActions, profileReducer } from '../model/slice/profileSlice';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { useCallback, useEffect, useState } from 'react';
import { getProfile } from '../model/services/getProfile/getProfile';
import { ProfileCard } from './ProfileCard/ProfileCard';
import PageLoader from '#/widgets/PageLoader';
import { useParams } from 'react-router';
import { DynamicModuleLoader } from '#/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfilePageToolbar } from './ProfilePageToolbar/ProfilePageToolbar';
import classes from './ProfilePage.module.scss';
import {
    getProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileIsReadonly,
} from '../model/selectors';
import { ProfilePagePlaceholder } from './ProfilePagePlaceholder/ProfilePagePlaceholder';
import { ProfileEditor } from './ProfileEditor/ProfileEditor';
import { updateProfile } from '../model/services/updateProfile/updateProfile';

const initialRedusers = { profile: profileReducer };

function ProfilePage() {
    const { profileId } = useParams();
    const profileData = useAppSelector(getProfileData);
    const isLoading = useAppSelector(getProfileIsLoading);
    const readonly = useAppSelector(getProfileIsReadonly);
    const error = useAppSelector(getProfileError);
    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleEdit = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
        setIsEditing(false);
    }, [dispatch]);

    const handleSaveEdit = useCallback(async () => {
        const result = await dispatch(updateProfile());
        if (result.meta.requestStatus === 'fulfilled') {
            setIsEditing(false);
        }
    }, [dispatch]);

    useEffect(() => {
        if (profileId) {
            dispatch(getProfile({ profileId }));
        }
    }, [dispatch, profileId]);

    return (
        <DynamicModuleLoader reducers={initialRedusers} removeAfterUnmount>
            <div className={classes.pageContainer}>
                <PageLoader view="secondary" show={isLoading} />
                {profileData ? (
                    isEditing ? (
                        <ProfileEditor />
                    ) : (
                        <ProfileCard profile={profileData} />
                    )
                ) : (
                    <ProfilePagePlaceholder i18nErrorKey={error} />
                )}
                {!readonly && (
                    <ProfilePageToolbar
                        onEdit={handleEdit}
                        onCancelEdit={handleCancelEdit}
                        onSaveEdit={handleSaveEdit}
                        isEditing={isEditing}
                    />
                )}
            </div>
        </DynamicModuleLoader>
    );
}

export default ProfilePage;
