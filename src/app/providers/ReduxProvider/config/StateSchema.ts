import { ProfileSchema } from '#/pages/ProfilePage';
import { UserSchema } from '#/entities/User';
import { LoginSchema } from '#/features/AuthByUsername';

export interface StateSchema {
    user: UserSchema;
    // async
    login?: LoginSchema;
    profile?: ProfileSchema;
}
