import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { memo, useCallback, useEffect } from 'react';
import { getProfile } from '../../model/services/getProfile/getProfile';
import PageLoader from '#/shared/ui/PageLoader';
import { DynamicModuleLoader } from '#/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfilePageToolbar } from '../ProfilePageToolbar/ProfilePageToolbar';
import classes from './ProfileCard.module.scss';
import {
    getProfileData,
    getProfileError,
    getProfileIsEditing,
    getProfileIsLoading,
    getProfileIsReadonly,
} from '../../model/selectors';
import { ProfileEditor } from '../ProfileEditor/ProfileEditor';
import { updateProfile } from '../../model/services/updateProfile/updateProfile';
import { getUserIsAuth } from '#/entities/User';
import { PagePlaceholder } from '#/widgets/PagePlaceholder/ui/PagePlaceholder';
import { ProfileCardСontent } from './ProfileCardContent';

const initialRedusers = { profile: profileReducer };

interface ProfileCardProps {
    profileId: string | undefined;
    editable?: boolean;
}

const ProfileCardInner = ({ profileId, editable }: ProfileCardProps) => {
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
        if (profileId !== undefined && __PROJECT__ !== 'storybook') {
            dispatch(getProfile({ profileId }));
        }
    }, [dispatch, profileId, isAuthenticated]);

    return (
        <DynamicModuleLoader reducers={initialRedusers} removeAfterUnmount>
            <div className={classes.cardContainer}>
                <PageLoader view="secondary" show={isLoading} />
                {profileData ? (
                    isEditing && !readonly ? (
                        <ProfileEditor />
                    ) : (
                        <ProfileCardСontent profile={profileData} />
                    )
                ) : (
                    <PagePlaceholder i18nErrorKey={error} />
                )}
                {!readonly && editable && (
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
};

export const ProfileCard = memo(ProfileCardInner);
