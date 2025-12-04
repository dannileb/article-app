import { sendComment } from './sendComment';
import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';
import { CommentType } from '#/entities/Comment';
import { convertTimestamp } from '#/shared/lib/date';

describe('sendComment.test', () => {
    const mockCommentBody = {
        text: 'Test text',
    };

    const mockResponse: CommentType = {
        id: 'test_ID',
        text: 'Test comment',
        author: {
            id: '1',
            username: 'test',
            photo: 'test',
        },
        createdAt: '1735678800',
    };

    const entityId = 'test_id';
    const entityType = 'test_type';

    it('should return data', async () => {
        const thunk = new TestAsyncThunk(sendComment, {
            addComment: {
                text: mockCommentBody.text,
            },
        });

        thunk.api.post.mockReturnValue(Promise.resolve({ data: mockResponse }));

        const result = await thunk.callThunk({
            entityId,
            entityType,
        });

        expect(thunk.api.post).toHaveBeenCalledWith(
            `/${entityType}/${entityId}/comments`,
            {
                text: mockCommentBody.text,
                entityId,
            },
        );
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual({
            ...mockResponse,
            createdAt: convertTimestamp(Number(mockResponse.createdAt)),
        });
    });

    it('should return error: comment text required', async () => {
        const thunk = new TestAsyncThunk(sendComment);
        const result = await thunk.callThunk({ entityId, entityType });

        expect(thunk.api.post).toHaveBeenCalledTimes(0);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({ message: 'unknown' });
    });

    it('should return error: backend error', async () => {
        const thunk = new TestAsyncThunk(sendComment, {
            addComment: {
                text: mockCommentBody.text,
            },
        });

        thunk.api.post.mockReturnValue(Promise.reject({ message: 'error' }));

        const result = await thunk.callThunk({ entityId, entityType });

        expect(thunk.api.post).toHaveBeenCalledWith(
            `/${entityType}/${entityId}/comments`,
            {
                text: mockCommentBody.text,
                entityId,
            },
        );
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({ message: 'unknown' });
    });
});
