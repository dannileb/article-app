export interface ResponseError {
    message: string;
}

export interface ListResponse<T> {
    data: T[];
    totalCount: number;
}
