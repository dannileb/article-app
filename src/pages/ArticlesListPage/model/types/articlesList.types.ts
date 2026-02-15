import { Article } from '#/entities/Article';
import { EntityState } from '@reduxjs/toolkit';

export type ArticlesListView = 'grid' | 'list';

export type ArticleSortValue = 'latest' | 'oldest' | 'popular' | 'default';

export interface ArticleSortParam {
    field: keyof Article;
    direction: 'asc' | 'desc';
}

export interface ArticlesListSchema extends EntityState<Article, string> {
    isLoading?: boolean;
    error?: string;
    totalCount?: number;
    view?: ArticlesListView;
    currentPage?: number;
    lastPage?: boolean;
    searchKey?: string;
    sort?: ArticleSortValue;
    _inited?: boolean;
}

export type ArticlesListResponse = Article[];
