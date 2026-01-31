import { fetchArticleById } from './fetchArticleById';
import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';
import { Article } from '#/entities/Article';
import { convertTimestamp } from '#/shared/lib/date';

describe('fetchArticleById.test', () => {
    const mockAuthor: Article['author'] = {
        id: 'test_id',
        username: 'test',
        photo: 'test',
    };
    const mockArticle: Article = {
        id: 'test_id',
        title: 'Test Article',
        content: [],
        createdAt: '1735678800',
        author: mockAuthor,
        tags: ['test'],
    };
    const payload = {
        data: mockArticle,
        readonly: true,
    };
    it('should return data', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);

        thunk.api.get.mockReturnValue(Promise.resolve({ data: payload }));

        const result = await thunk.callThunk({ articleId: 'test_id' });

        expect(thunk.api.get).toHaveBeenCalledWith('/article/test_id');
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual({
            data: {
                ...mockArticle,
                createdAt: convertTimestamp(Number(mockArticle.createdAt)),
            },
            readonly: true,
        });
    });

    it('should return error', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);

        thunk.api.get.mockReturnValue(Promise.reject({ message: 'error' }));

        const result = await thunk.callThunk({ articleId: '1' });

        expect(thunk.api.get).toHaveBeenCalledWith('/article/1');
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({ message: 'unknown' });
    });
});
