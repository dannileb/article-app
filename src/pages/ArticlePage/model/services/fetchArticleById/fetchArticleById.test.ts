import { Profile } from '#/entities/Profile';
import { fetchArticleById } from '#/pages/ArticlePage/model/services/fetchArticleById/fetchArticleById';
import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';
import { Article } from '../../types/article.types';

describe('fetchArticleById.test', () => {
    const mockAuthor: Profile = {
        id: 1,
        username: 'test',
        name: 'test',
        surname: 'test',
        photo: 'test',
        age: 1,
        country: 'test',
        city: 'test',
        currency: 'test',
    };
    const mockArticle: Article = {
        id: 1,
        title: 'Test Article',
        content: [],
        createdAt: '2022-01-01',
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

        const result = await thunk.callThunk({ articleId: '1' });

        expect(thunk.api.get).toHaveBeenCalledWith('/articles/1');
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(payload);
    });

    it('should return error', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);

        thunk.api.get.mockReturnValue(Promise.reject({ message: 'error' }));

        const result = await thunk.callThunk({ articleId: '1' });

        expect(thunk.api.get).toHaveBeenCalledWith('/articles/1');
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({ message: 'unknown' });
    });
});
