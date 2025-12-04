import { CommentType } from '#/entities/Comment';
import { ListResponse } from '#/shared/types/Axios/Axios.types';
import { EntityState } from '@reduxjs/toolkit';

export type ArticleCommentsResponse = ListResponse<CommentType>;

export interface ArticleCommentsSchema
    extends EntityState<CommentType, string> {
    isLoading: boolean;
    totalCount?: number;
    error?: string;
}
