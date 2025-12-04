import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { ArticleCommentsSchema } from '../types/articleComments.types';
import {
    articleCommentsActions,
    articleCommentsReducer,
} from '../slice/articleCommentSlice';

describe('articleCommentSlice.test', () => {
    it('should set article edit', () => {
        const state: DeepPartial<ArticleCommentsSchema> = {
            totalCount: 0,
            ids: [],
            entities: {},
        };

        const mockComment = {
            id: 'test_ID',
            text: 'Test comment',
            author: {
                id: '1',
                username: 'test',
                photo: 'test',
            },
            createdAt: '1735678800',
        };

        expect(
            articleCommentsReducer(
                state as ArticleCommentsSchema,
                articleCommentsActions.addComment(mockComment),
            ),
        ).toEqual({
            totalCount: 1,
            ids: ['test_ID'],
            entities: {
                test_ID: mockComment,
            },
        });
    });
});
