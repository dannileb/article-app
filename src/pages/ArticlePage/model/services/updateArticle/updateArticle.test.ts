import { updateArticle } from './updateArticle';
import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';
import { $api } from '#/shared/api/api';
import { Article, ArticleBase } from '#/entities/Article';

jest.mock('#/shared/api/api');
const mockedAxios = jest.mocked($api);

const mockAuthor: Article['author'] = {
    id: '1',
    username: 'test',
    photo: 'test',
};
const mockArticleForm: ArticleBase = {
    title: 'Test Article',
    content: [],
    tags: ['test'],
};
const mockArticle: Article = {
    id: '1',
    createdAt: '2022-01-01',
    author: mockAuthor,
    ...mockArticleForm,
};

const rejectedMessage = {
    message: 'unknown',
};

describe('updateArticle.test', () => {
    test('should return authError: localStorage does not have token', async () => {
        const thunk = new TestAsyncThunk(updateArticle, {
            article: {
                form: mockArticleForm,
                data: mockArticle,
            },
        });

        thunk.api.put.mockRejectedValue(rejectedMessage);
        const result = await thunk.callThunk(undefined);

        expect(mockedAxios.put).toHaveBeenCalledWith(
            '/article/1',
            mockArticleForm,
        );
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual(rejectedMessage);
    });

    test('should return profile', async () => {
        const thunk = new TestAsyncThunk(updateArticle, {
            article: {
                form: mockArticleForm,
                data: mockArticle,
            },
        });

        thunk.api.put.mockResolvedValue({ data: mockArticle });
        const result = await thunk.callThunk(undefined);

        expect(mockedAxios.put).toHaveBeenCalledWith(
            '/article/1',
            mockArticleForm,
        );
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticle);
    });
});
