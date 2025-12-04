import { getArticleData } from './getArticleData';
import { getArticleIsLoading } from './getArticleIsLoading';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { Article, ArticleBase } from '../../types/article.types';
import { getArticleError } from './getArticleError';
import { getArticleIsReadonly } from './getArticleIsReadonly';
import { getArticleForm } from './getArticleForm';

describe('getArticleSelectors.test', () => {
    it('should return article data', () => {
        const mockAuthor: Article['author'] = {
            id: 'test_id',
            username: 'test',
            photo: 'test',
        };
        const mockArticle: Article = {
            id: 'test_id',
            title: 'Test Article',
            content: [],
            createdAt: '2022-01-01',
            author: mockAuthor,
            tags: ['test'],
        };
        const state: DeepPartial<StateSchema> = {
            article: {
                data: mockArticle,
            },
        };
        expect(getArticleData(state as StateSchema)).toEqual(mockArticle);
    });
    it('should return formData', () => {
        const testForm: ArticleBase = {
            title: 'Test Article',
            content: [
                {
                    id: 'test',
                    type: 'text',
                    title: 'Test Title',
                    blockContent: 'Test Content',
                },
            ],
            tags: ['test'],
        };
        const state: DeepPartial<StateSchema> = {
            article: {
                form: testForm,
            },
        };
        expect(getArticleForm(state as StateSchema)).toEqual(testForm);
    });

    it('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            article: {
                isLoading: true,
            },
        };
        expect(getArticleIsLoading(state as StateSchema)).toBe(true);
    });
    it('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            article: {
                error: 'error',
            },
        };
        expect(getArticleError(state as StateSchema)).toBe('error');
    });

    it('should return readonly', () => {
        const state: DeepPartial<StateSchema> = {
            article: {
                readonly: true,
            },
        };
        expect(getArticleIsReadonly(state as StateSchema)).toBe(true);
    });

    it('should return undefined if data is undefined', () => {
        const state: DeepPartial<StateSchema> = {
            article: {
                data: undefined,
            },
        };
        expect(getArticleData(state as StateSchema)).toBeUndefined();
    });

    it('should return undefined if state is undefined', () => {
        const state: DeepPartial<StateSchema> = {
            article: undefined,
        };
        expect(getArticleData(state as StateSchema)).toBeUndefined();
        expect(getArticleIsLoading(state as StateSchema)).toBeUndefined();
        expect(getArticleError(state as StateSchema)).toBeUndefined();
    });
});
