import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { convertTimestamp } from '#/shared/lib/date';
import { PageableResponse } from '#/shared/types/Axios/Axios.types';
import { Article } from '#/entities/Article';
import { getArticlesListSort } from '../../selectors/getArticlesListSort';
import { getArticlesListSearchKey } from '../../selectors/getArticlesSearchKey';
import { getArticlesListPage } from '../../selectors/getArticlesListPage';
import { ArticleSortValue } from '../../types/articlesList.types';

const ARTICLES_SORT_MAP: Record<ArticleSortValue, string | undefined> = {
    default: undefined,
    popular: 'views,desc',
    oldest: 'createdAt,asc',
    latest: 'createdAt,desc',
};

interface FetchNextArticlesListPageProps {
    replace?: boolean;
}

export const fetchNextArticlesListPage = createAsyncThunk<
    PageableResponse<Article>,
    FetchNextArticlesListPageProps,
    ThunkConfig
>(
    'articlesList/fetchNextArticlesListPage',
    async (_, { extra, rejectWithValue, getState }) => {
        const { api } = extra;
        const state = getState();
        const page = getArticlesListPage(state);
        const sort = getArticlesListSort(state);
        const searchKey = getArticlesListSearchKey(state);

        try {
            const queryParams = new URLSearchParams();
            queryParams.append('page', page.toString());
            if (ARTICLES_SORT_MAP[sort]) {
                queryParams.append('sort', ARTICLES_SORT_MAP[sort]);
            }
            if (searchKey) {
                queryParams.append('searchKey', searchKey);
            }
            const response = await api.get<PageableResponse<Article>>(
                `/articles?${queryParams.toString()}`,
            );
            const adaptedData = response.data.items.map((article) => ({
                ...article,
                createdAt: convertTimestamp(Number(article.createdAt)),
            }));
            return {
                ...response.data,
                items: adaptedData,
            };
        } catch (error: unknown) {
            return processAsyncThunkError(error, rejectWithValue);
        }
    },
);
