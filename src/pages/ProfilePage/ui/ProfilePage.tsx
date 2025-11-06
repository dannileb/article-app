import { profileActions, profileReducer } from '../model/slice/profileSlice';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { useCallback, useEffect } from 'react';
import { getProfile } from '../model/services/getProfile/getProfile';
import PageLoader from '#/widgets/PageLoader';
import { useParams } from 'react-router';
import { DynamicModuleLoader } from '#/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfilePageToolbar } from './ProfilePageToolbar/ProfilePageToolbar';
import classes from './ProfilePage.module.scss';
import {
    getProfileData,
    getProfileError,
    getProfileIsEditing,
    getProfileIsLoading,
    getProfileIsReadonly,
} from '../model/selectors';
import { ProfileEditor } from './ProfileEditor/ProfileEditor';
import { updateProfile } from '../model/services/updateProfile/updateProfile';
import { getUserIsAuth } from '#/entities/User';
import { ProfileCard } from '#/entities/Profile';
import { PagePlaceholder } from '#/widgets/PagePlaceholder/ui/PagePlaceholder';

const initialRedusers = { profile: profileReducer };

function ProfilePage() {
    const { profileId } = useParams();

    const isAuthenticated = useAppSelector(getUserIsAuth);
    const profileData = useAppSelector(getProfileData);
    const isLoading = useAppSelector(getProfileIsLoading);
    const isEditing = useAppSelector(getProfileIsEditing);
    const readonly = useAppSelector(getProfileIsReadonly);
    const error = useAppSelector(getProfileError);
    const dispatch = useAppDispatch();

    const handleEdit = useCallback(() => {
        dispatch(profileActions.edit());
    }, [dispatch]);

    const handleCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const handleSaveEdit = useCallback(() => {
        dispatch(updateProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profileId && __PROJECT__ !== 'storybook') {
            dispatch(getProfile({ profileId }));
        }
    }, [dispatch, profileId, isAuthenticated]);

    return (
        <DynamicModuleLoader reducers={initialRedusers} removeAfterUnmount>
            <div className={classes.pageContainer}>
                <PageLoader view="secondary" show={isLoading} />
                {profileData ? (
                    isEditing && !readonly ? (
                        <ProfileEditor />
                    ) : (
                        <ProfileCard profile={profileData} />
                    )
                ) : (
                    <PagePlaceholder i18nErrorKey={error} />
                )}
                {!readonly && (
                    <ProfilePageToolbar
                        onEdit={handleEdit}
                        onCancelEdit={handleCancelEdit}
                        onSaveEdit={handleSaveEdit}
                        isEditing={!!isEditing}
                    />
                )}
            </div>
        </DynamicModuleLoader>
    );
}

export default ProfilePage;
