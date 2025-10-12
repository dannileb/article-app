export interface User {
    id: number;
    username: string;
    name: string;
    role: string;
}

export interface UserSchema {
    authData?: User;
}
