export interface Profile {
    id: string;
    username: string;
    name: string;
    surname: string;
    photo: string;
    age: number;
    country: string;
    city: string;
    currency: string;
}

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
    isEditing?: boolean;
    isUpdateLoading?: boolean;
    updateError?: string;
}
