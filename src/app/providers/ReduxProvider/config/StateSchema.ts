import { ProfileSchema } from '#/entities/Profile';
import { UserSchema } from '#/entities/User';
import { AddCommentSchema } from '#/features/AddComment';
import { LoginSchema } from '#/features/AuthByUsername';
import { ArticleSchema } from '#/entities/Article';
import { ArticleCommentsSchema } from '#/pages/ArticlePage';
import { ArticlesListSchema } from '#/pages/ArticlesListPage';
import { PreserveSrollPositionSchema } from '#/features/PreserveScrollPosition';

export interface StateSchema {
    user: UserSchema;
    preserveScrollPosition: PreserveSrollPositionSchema;
    // async
    login?: LoginSchema;
    profile?: ProfileSchema;
    articlesList?: ArticlesListSchema;
    article?: ArticleSchema;
    articleComments?: ArticleCommentsSchema;
    addComment?: AddCommentSchema;
}
