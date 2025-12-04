import { getArticleCommentsError } from './getArticleCommentsError';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { getArticleCommentsIsLoading } from './getArticleCommentsIsLoading';

describe('getArticleComments.test', () => {
    it('should return article comments error', () => {
        const error = 'test';
        const state: DeepPartial<StateSchema> = {
            articleComments: {
                error,
            },
        };
        expect(getArticleCommentsError(state as StateSchema)).toBe(error);
    });
    it('should return is loading', () => {
        const state: DeepPartial<StateSchema> = {
            articleComments: {
                isLoading: true,
            },
        };
        expect(getArticleCommentsIsLoading(state as StateSchema)).toBe(true);
    });

    it('should return undefined if state is undefined', () => {
        const state: DeepPartial<StateSchema> = {
            article: undefined,
        };
        expect(getArticleCommentsError(state as StateSchema)).toBeUndefined();
        expect(
            getArticleCommentsIsLoading(state as StateSchema),
        ).toBeUndefined();
    });
});
