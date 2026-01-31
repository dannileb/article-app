export interface ResponseError {
    message: string;
}

export interface ListResponse<T> {
    data: T[];
    totalCount: number;
}

export interface PageableResponse<T> {
    page: number;
    limit: number;
    total: number;
    lastPage: boolean;
    items: T[];
}
