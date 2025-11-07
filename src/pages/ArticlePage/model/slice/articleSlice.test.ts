import {
    Article,
    ArticleBase,
    ArticleBlockType,
    ArticleSchema,
} from '../types/article.types';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { articleActions, articleReducer } from './articleSlice';
import { Profile } from '#/entities/Profile';

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
const mockArticleForm: ArticleBase = {
    title: 'Test Article',
    content: [],
    tags: ['test'],
};
const mockArticle: Article = {
    id: 1,
    createdAt: '2022-01-01',
    author: mockAuthor,
    ...mockArticleForm,
};

describe('articleSlice.test', () => {
    it('should set article edit', () => {
        const state: DeepPartial<ArticleSchema> = {
            isEditing: false,
        };

        expect(
            articleReducer(state as ArticleSchema, articleActions.edit()),
        ).toEqual({
            isEditing: true,
        });
    });

    it('should cancel article edit', () => {
        const state: DeepPartial<ArticleSchema> = {
            form: {
                title: 'Test Article edited',
                content: [
                    { type: 'text', blockContent: 'Test Article edited' },
                ],
                tags: ['test'],
            },
            data: mockArticle,
            isEditing: true,
            updateError: 'test',
        };

        expect(
            articleReducer(state as ArticleSchema, articleActions.cancelEdit()),
        ).toEqual({
            isEditing: false,
            form: mockArticleForm,
            data: mockArticle,
            updateError: undefined,
        });
    });

    it('should set article title', () => {
        const state: DeepPartial<ArticleSchema> = {
            form: {
                title: 'Test Article',
            },
        };

        expect(
            articleReducer(
                state as ArticleSchema,
                articleActions.setArticleTitle('Test Article edited'),
            ),
        ).toEqual({
            form: {
                title: 'Test Article edited',
            },
        });
    });

    it('should add article tag', () => {
        const state: DeepPartial<ArticleSchema> = {
            form: {
                tags: ['test'],
            },
        };

        expect(
            articleReducer(
                state as ArticleSchema,
                articleActions.addArtcileTag('test2'),
            ),
        ).toEqual({
            form: {
                tags: ['test', 'test2'],
            },
        });
    });

    it('should delete article tag', () => {
        const state: DeepPartial<ArticleSchema> = {
            form: {
                tags: ['test', 'test2'],
            },
        };

        expect(
            articleReducer(
                state as ArticleSchema,
                articleActions.deleteArtcileTag('test2'),
            ),
        ).toEqual({
            form: {
                tags: ['test'],
            },
        });
    });

    it('should add article block', () => {
        const state: DeepPartial<ArticleSchema> = {
            form: {
                content: [],
            },
        };
        const blocksArray: Record<ArticleBlockType, ArticleBlockType> = {
            text: 'text',
            image: 'image',
            code: 'code',
        };
        const blocksTypes = Object.keys(blocksArray) as ArticleBlockType[];

        blocksTypes.forEach((block) => {
            expect(
                articleReducer(
                    state as ArticleSchema,
                    articleActions.addArticleBlock(block),
                ),
            ).toEqual({
                form: {
                    content: [{ type: block, title: '', blockContent: '' }],
                },
            });
        });
    });

    it('should delete article block', () => {
        const state: DeepPartial<ArticleSchema> = {
            form: {
                content: [
                    { type: 'text', title: '', blockContent: '' },
                    { type: 'image', title: '', blockContent: '' },
                ],
            },
        };

        expect(
            articleReducer(
                state as ArticleSchema,
                articleActions.deleteArticleBlock(1),
            ),
        ).toEqual({
            form: {
                content: [{ type: 'text', title: '', blockContent: '' }],
            },
        });
    });

    it('should set article block title', () => {
        const state: DeepPartial<ArticleSchema> = {
            form: {
                content: [{ type: 'text', title: '', blockContent: '' }],
            },
        };

        expect(
            articleReducer(
                state as ArticleSchema,
                articleActions.setBlockTitle({
                    index: 0,
                    title: 'Test',
                }),
            ),
        ).toEqual({
            form: {
                content: [{ type: 'text', title: 'Test', blockContent: '' }],
            },
        });
    });

    it('should set article block content', () => {
        const state: DeepPartial<ArticleSchema> = {
            form: {
                content: [{ type: 'text', title: '', blockContent: '' }],
            },
        };

        expect(
            articleReducer(
                state as ArticleSchema,
                articleActions.setBlockContent({
                    index: 0,
                    content: 'Test',
                }),
            ),
        ).toEqual({
            form: {
                content: [{ type: 'text', title: '', blockContent: 'Test' }],
            },
        });
    });
});
