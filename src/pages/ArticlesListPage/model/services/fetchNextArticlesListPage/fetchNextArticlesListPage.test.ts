import { Article } from '#/entities/Article';
import { fetchNextArticlesListPage } from './fetchNextArticlesListPage';
import { convertTimestamp } from '#/shared/lib/date';
import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';
import { PageableResponse } from '#/shared/types/Axios/Axios.types';

describe('fetchNextArticlesListPage.test', () => {
    const mockArticle: Article = {
        id: '1',
        title: 'Test article',
        description: 'Test description',
        createdAt: '1735678800',
        preview: '#',
        author: {
            id: 'test_id',
            username: 'test',
            photo: 'test',
        },
        tags: ['test'],
        content: [],
    };
    const currentPage = 1;
    const payload: PageableResponse<Article> = {
        page: currentPage,
        limit: 10,
        total: 1,
        lastPage: true,
        items: [mockArticle],
    };
    it('should return articles list', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesListPage, {
            articlesList: { currentPage },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: payload }));

        const result = await thunk.callThunk({});

        expect(thunk.api.get).toHaveBeenCalledWith(
            `/articles?page=${currentPage}`,
        );
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual({
            ...payload,
            items: payload.items.map((article) => ({
                ...article,
                createdAt: convertTimestamp(Number(mockArticle.createdAt)),
            })),
        });
    });
});
