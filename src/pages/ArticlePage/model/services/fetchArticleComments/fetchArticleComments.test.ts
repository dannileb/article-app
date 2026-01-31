import { fetchArticleComments } from './fetchArticleComments';
import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';
import { ListResponse } from '#/shared/types/Axios/Axios.types';
import { CommentType } from '#/entities/Comment';
import { convertTimestamp } from '#/shared/lib/date';

describe('fetchArticleComments.test', () => {
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

    const mockResponse: ListResponse<CommentType> = {
        totalCount: 1,
        data: [mockComment],
    };

    it('should return data', async () => {
        const thunk = new TestAsyncThunk(fetchArticleComments);

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockResponse }));

        const result = await thunk.callThunk({ articleId: 'test_id' });

        expect(thunk.api.get).toHaveBeenCalledWith('/article/test_id/comments');
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual({
            ...mockResponse,
            data: [
                {
                    ...mockComment,
                    createdAt: convertTimestamp(Number(mockComment.createdAt)),
                },
            ],
        });
    });

    it('should return error', async () => {
        const thunk = new TestAsyncThunk(fetchArticleComments);

        thunk.api.get.mockReturnValue(Promise.reject({ message: 'error' }));

        const result = await thunk.callThunk({ articleId: 'test' });

        expect(thunk.api.get).toHaveBeenCalledWith('/article/test/comments');
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({ message: 'unknown' });
    });
});
