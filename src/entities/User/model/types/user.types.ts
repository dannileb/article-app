export interface User {
    id: number;
    username: string;
    role: string;
}

export interface UserWithToken {
    user: User;
    accessToken: string;
}

export interface UserSchema {
    authData?: User;
    isLoading?: boolean;
}
