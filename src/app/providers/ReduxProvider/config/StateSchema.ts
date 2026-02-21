import { ProfileSchema } from '#/entities/Profile';
import { UserSchema } from '#/entities/User';
import { LoginSchema } from '#/features/AuthByUsername';
import { ArticleSchema } from '#/entities/Article';
import { ArticlesListSchema } from '#/pages/ArticlesListPage';
import { PreserveSrollPositionSchema } from '#/features/PreserveScrollPosition';
import { rtkQueryApi } from '#/shared/api/api';

export interface StateSchema {
    user: UserSchema;
    preserveScrollPosition: PreserveSrollPositionSchema;
    [rtkQueryApi.reducerPath]: ReturnType<typeof rtkQueryApi.reducer>;
    // async
    login?: LoginSchema;
    profile?: ProfileSchema;
    articlesList?: ArticlesListSchema;
    article?: ArticleSchema;
}
