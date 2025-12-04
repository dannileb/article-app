export interface CommentType {
    id: string;
    author: {
        id: string;
        username: string;
        photo?: string;
    };
    text: string;
    createdAt: string;
}
