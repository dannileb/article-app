import { Rating } from '#/entities/Rating';
import { useCallback } from 'react';
import {
    useGetProfileRatingQuery,
    useRateProfileMutation,
} from '../api/profileRatingApi';
import { useTranslation } from 'react-i18next';

interface ProfileRatingProps {
    profileId: string;
}

export const ProfileRating = ({ profileId }: ProfileRatingProps) => {
    const { t } = useTranslation('profile');
    const { data: profileRating } = useGetProfileRatingQuery(profileId);
    const [rateProfile] = useRateProfileMutation();

    const handleRateProfile = useCallback(
        (rating: number, feedback: string) => {
            rateProfile({ profileId, rating, feedback });
        },
        [profileId, rateProfile],
    );

    return (
        <Rating
            title={profileRating ? t('yourRate') : t('ratingTitle')}
            value={profileRating?.rating ?? 0}
            onSendFeedback={handleRateProfile}
            feedback={profileRating?.feedback}
            feedbackPlaceholder={t('feedbackPlaceholder')}
            withFeedback
        />
    );
};
