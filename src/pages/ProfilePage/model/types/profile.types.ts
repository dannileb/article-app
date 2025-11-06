import { Profile } from '#/entities/Profile';

export interface ProfileResponse {
    profileData: Profile;
    readonly: boolean;
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly?: boolean;
    isUpdateLoading?: boolean;
    updateError?: string;
    isEditing?: boolean;
}
