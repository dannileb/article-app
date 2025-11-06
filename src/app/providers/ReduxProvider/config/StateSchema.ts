import { ProfileSchema } from '#/pages/ProfilePage';
import { UserSchema } from '#/entities/User';
import { LoginSchema } from '#/features/AuthByUsername';
import { ArticleSchema } from '#/pages/ArticlePage';

export interface StateSchema {
    user: UserSchema;
    // async
    login?: LoginSchema;
    profile?: ProfileSchema;
    article?: ArticleSchema;
}
