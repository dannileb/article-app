import { Profile } from '#/entities/Profile';

export type ArticleBlockType = 'text' | 'image' | 'code';

export interface IArticleBlock {
    id?: string;
    type: ArticleBlockType;
    title?: string;
    blockContent: string;
}

export interface ArticleBase {
    title: string;
    content: IArticleBlock[];
    tags: string[];
}

export interface Article extends ArticleBase {
    id: number;
    title: string;
    content: IArticleBlock[];
    createdAt: string;
    author: Profile;
    tags: string[];
}

export interface ArticleResponse {
    data: Article;
    readonly: boolean;
}

export interface ArticleSchema {
    data?: Article;
    form?: ArticleBase;
    isLoading: boolean;
    error?: string;
    isUpdateLoading?: boolean;
    updateError?: string;
    readonly: boolean;
    isEditing: boolean;
}
