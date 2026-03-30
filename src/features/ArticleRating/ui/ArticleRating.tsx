import { Rating } from '#/entities/Rating';
import { useCallback } from 'react';
import {
    useGetArticleRatingQuery,
    useRateArticleMutation,
} from '../api/articleRatingApi';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getUserIsAuth } from '#/entities/User';

interface ArticleRatingProps {
    articleId: string;
}

export const ArticleRating = ({ articleId }: ArticleRatingProps) => {
    const { t } = useTranslation('article');
    const isAuth = useAppSelector(getUserIsAuth);
    const { data: articleRating } = useGetArticleRatingQuery(articleId);
    const [rateArticle] = useRateArticleMutation();

    const handleRateArticle = useCallback(
        (rating: number, feedback: string) => {
            rateArticle({ articleId, rating, feedback });
        },
        [articleId, rateArticle],
    );

    if (!isAuth) {
        return null;
    }

    return (
        <Rating
            title={articleRating ? t('yourRating') : t('article.ratingTitle')}
            value={articleRating?.rating ?? 0}
            onSendFeedback={handleRateArticle}
        />
    );
};
