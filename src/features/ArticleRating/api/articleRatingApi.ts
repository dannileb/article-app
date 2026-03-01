import {
    ArticleRating,
    ArticleRatingBase,
} from '../model/types/articleRating.types';
import { rtkQueryApi } from '#/shared/api/api';

export const articleRatingApi = rtkQueryApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<ArticleRating, string>({
            query: (id) => `/articles/${id}/rating`,
            providesTags: (_, __, id) => [{ type: 'ArticleRating', id }],
        }),
        rateArticle: build.mutation<void, ArticleRatingBase>({
            query: (articleRating) => ({
                url: `/articles/${articleRating.articleId}/rating`,
                method: 'POST',
                body: articleRating,
            }),
            invalidatesTags: (_, __, { articleId }) => [
                { type: 'ArticleRating', id: articleId },
            ],
        }),
    }),
});

export const { useGetArticleRatingQuery } = articleRatingApi;
export const { useRateArticleMutation } = articleRatingApi;
