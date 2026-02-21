import { Article } from '#/entities/Article';
import { rtkQueryApi } from '#/shared/api/api';
import { convertTimestamp } from '#/shared/lib/date';
import { PageableResponse } from '#/shared/types/Axios/Axios.types';

const extendedApi = rtkQueryApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendations: build.query<PageableResponse<Article>, void>(
            {
                query: () => '/articles?limit=3&sort=views,desc',
                transformResponse: (response: PageableResponse<Article>) => ({
                    ...response,
                    items: response.items.map((article) => ({
                        ...article,
                        createdAt: convertTimestamp(Number(article.createdAt)),
                    })),
                }),
            },
        ),
    }),
});

export const { useGetArticleRecommendationsQuery } = extendedApi;
