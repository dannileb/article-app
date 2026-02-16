import { ArticleCommentsSchema } from '../../model/types/articleComments.types';
import { ArticleRecommendationsSchema } from '../../model/types/articleRecommendations.types';

export interface ArticlePageSchema {
    comments: ArticleCommentsSchema;
    recommendations: ArticleRecommendationsSchema;
}
