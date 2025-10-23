import { profileActions } from '../../model/slice/profileSlice';
import { useAppDispatch } from '#/shared/lib/hooks/reduxHooks';
import { useCallback } from 'react';

export const useProfileEditor = () => {
    const dispatch = useAppDispatch();

    const handleChangeName = useCallback(
        (value?: string) => {
            dispatch(profileActions.setProfileForm({ name: value || '' }));
        },
        [dispatch],
    );

    const handleChangeSurname = useCallback(
        (value?: string) => {
            dispatch(profileActions.setProfileForm({ surname: value || '' }));
        },
        [dispatch],
    );

    const handleChangeCity = useCallback(
        (value?: string) => {
            dispatch(profileActions.setProfileForm({ city: value || '' }));
        },
        [dispatch],
    );

    const handleChangeAge = useCallback(
        (value?: string) => {
            dispatch(
                profileActions.setProfileForm({ age: Number(value || 0) }),
            );
        },
        [dispatch],
    );

    const handleChangeUsername = useCallback(
        (value?: string) => {
            dispatch(profileActions.setProfileForm({ username: value || '' }));
        },
        [dispatch],
    );

    const handleChangePhoto = useCallback(
        (value?: string) => {
            dispatch(profileActions.setProfileForm({ photo: value || '' }));
        },
        [dispatch],
    );

    const handleChangeCurrency = useCallback(
        (value?: string) => {
            dispatch(profileActions.setProfileForm({ currency: value || '' }));
        },
        [dispatch],
    );

    const handleChangeCountry = useCallback(
        (value?: string) => {
            dispatch(profileActions.setProfileForm({ country: value || '' }));
        },
        [dispatch],
    );

    return {
        handleChangeName,
        handleChangeSurname,
        handleChangeCity,
        handleChangeAge,
        handleChangeUsername,
        handleChangePhoto,
        handleChangeCurrency,
        handleChangeCountry,
    };
};
