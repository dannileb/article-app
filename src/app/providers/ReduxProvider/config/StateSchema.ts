import { ProfileSchema } from '#/entities/Profile';
import { UserSchema } from '#/entities/User';
import { AddCommentSchema } from '#/features/AddComment';
import { LoginSchema } from '#/features/AuthByUsername';
import { ArticleCommentsSchema, ArticleSchema } from '#/pages/ArticlePage';

export interface StateSchema {
    user: UserSchema;
    // async
    login?: LoginSchema;
    profile?: ProfileSchema;
    article?: ArticleSchema;
    articleComments?: ArticleCommentsSchema;
    addComment?: AddCommentSchema;
}
