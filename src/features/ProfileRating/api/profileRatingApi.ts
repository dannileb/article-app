import {
    ProfileRating,
    ProfileRatingBase,
} from '../model/types/profileRating.types';
import { rtkQueryApi } from '#/shared/api/api';

export const profileRatingApi = rtkQueryApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileRating: build.query<ProfileRating, string>({
            query: (id) => `/profiles/${id}/rating`,
        }),
        rateProfile: build.mutation<void, ProfileRatingBase>({
            query: (profileRating) => ({
                url: `/profiles/${profileRating.profileId}/rating`,
                method: 'POST',
                body: profileRating,
            }),
            async onQueryStarted(
                { profileId, ...patch },
                { dispatch, queryFulfilled },
            ) {
                const patchResult = dispatch(
                    profileRatingApi.util.updateQueryData(
                        'getProfileRating',
                        profileId,
                        (draft) => {
                            Object.assign(draft, patch);
                        },
                    ),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const { useGetProfileRatingQuery, useRateProfileMutation } =
    profileRatingApi;
