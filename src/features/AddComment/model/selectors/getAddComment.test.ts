import { getAddCommentError } from './getAddCommentError';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { getAddCommentText } from './getAddCommentText';

describe('getAddComment.test', () => {
    it('should return comment text', () => {
        const text = 'Test comment';
        const state: DeepPartial<StateSchema> = {
            addComment: {
                text,
            },
        };
        expect(getAddCommentText(state as StateSchema)).toEqual('Test comment');
    });

    it('should return comment error', () => {
        const error = 'Test error';
        const state: DeepPartial<StateSchema> = {
            addComment: {
                error,
            },
        };
        expect(getAddCommentError(state as StateSchema)).toEqual('Test error');
    });

    it('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAddCommentError(state as StateSchema)).toBeUndefined();
        expect(getAddCommentError(state as StateSchema)).toBeUndefined();
    });
});
