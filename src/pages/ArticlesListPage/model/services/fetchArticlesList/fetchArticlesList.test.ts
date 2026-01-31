import { Article } from '#/entities/Article';
import { fetchArticlesList } from './fetchArticlesList';
import { convertTimestamp } from '#/shared/lib/date';
import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';
import { PageableResponse } from '#/shared/types/Axios/Axios.types';

describe('fetchArticlesList.test', () => {
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
    const payload: PageableResponse<Article> = {
        page: 1,
        limit: 10,
        total: 1,
        lastPage: true,
        items: [mockArticle],
    };
    it('should return articles list', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList);

        thunk.api.get.mockReturnValue(Promise.resolve({ data: payload }));

        const result = await thunk.callThunk(undefined);

        expect(thunk.api.get).toHaveBeenCalledWith('/articles');
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(
            payload.items.map((article) => ({
                ...article,
                createdAt: convertTimestamp(Number(mockArticle.createdAt)),
            })),
        );
    });
});
