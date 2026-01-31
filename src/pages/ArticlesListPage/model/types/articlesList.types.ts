import { Article } from '#/entities/Article';
import { EntityState } from '@reduxjs/toolkit';

export type ArticlesListView = 'grid' | 'list';

export interface ArticlesListSchema extends EntityState<Article, string> {
    isLoading?: boolean;
    error?: string;
    totalCount?: number;
    view?: ArticlesListView;
    currentPage?: number;
    lastPage?: boolean;
    _inited?: boolean;
}

export type ArticlesListResponse = Article[];
