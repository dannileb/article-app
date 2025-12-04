export interface User {
    id: string;
    username: string;
    role: string;
}

export interface UserWithToken {
    user: User;
    accessToken: string;
}

export interface UserSchema {
    authData?: User;
    isAuthenticated: boolean;
    isLoading?: boolean;
}
