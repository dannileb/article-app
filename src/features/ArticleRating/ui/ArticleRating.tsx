import { Rating } from '#/entities/Rating';
import { useCallback } from 'react';
import {
    useGetArticleRatingQuery,
    useRateArticleMutation,
} from '../api/articleRatingApi';
import { useTranslation } from 'react-i18next';

interface ArticleRatingProps {
    articleId: string;
}

export const ArticleRating = ({ articleId }: ArticleRatingProps) => {
    const { t } = useTranslation('article');
    const { data: articleRating } = useGetArticleRatingQuery(articleId);
    const [rateArticle] = useRateArticleMutation();

    const handleRateArticle = useCallback(
        (rating: number, feedback: string) => {
            rateArticle({ articleId, rating, feedback });
        },
        [articleId, rateArticle],
    );

    return (
        <Rating
            title={articleRating ? t('yourRating') : t('article.ratingTitle')}
            value={articleRating?.rating ?? 0}
            onSendFeedback={handleRateArticle}
        />
    );
};
