export interface ArticleRatingBase {
    articleId: string;
    rating: number;
    feedback: string;
}

export interface ArticleRating extends ArticleRatingBase {
    id: string;
    userId: string;
}
