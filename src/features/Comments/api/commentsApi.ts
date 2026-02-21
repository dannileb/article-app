import { EntityType } from '../model/types/comments.types';
import { rtkQueryApi } from '#/shared/api/api';
import { CommentType } from '#/entities/Comment';
import { ListResponse } from '#/shared/types/Axios/Axios.types';
import { convertTimestamp } from '#/shared/lib/date';

export const commentsApi = rtkQueryApi.injectEndpoints({
    endpoints: (build) => ({
        getComments: build.query<
            ListResponse<CommentType>,
            { entityType: EntityType; entityId: string }
        >({
            query: ({ entityType, entityId }) =>
                `/comments/${entityType}/${entityId}`,
            transformResponse: (response: ListResponse<CommentType>) => {
                return {
                    ...response,
                    data: response.data.map((comment) => ({
                        ...comment,
                        createdAt: convertTimestamp(Number(comment.createdAt)),
                    })),
                };
            },
            providesTags: (_, __, { entityType, entityId }) => [
                { type: 'Comment', id: `${entityType}-${entityId}` },
            ],
        }),

        addComment: build.mutation<
            CommentType,
            { entityType: EntityType; entityId: string; text: string }
        >({
            query: ({ entityType, entityId, text }) => ({
                url: `/comments/${entityType}/${entityId}`,
                method: 'POST',
                body: { text },
            }),
            invalidatesTags: (_, __, { entityType, entityId }) => [
                { type: 'Comment', id: `${entityType}-${entityId}` },
            ],
        }),
    }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = commentsApi;
