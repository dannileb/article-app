import { Heading } from '#/shared/ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import classes from './ArticlePageRecommendations.module.scss';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { ArticlesList } from '#/entities/Article';
import { getArticleRecommendations } from '../../model/slice/articleRecommendationsSlice';
import { useEffect } from 'react';
import { fetchArticleRecommendations } from '../../model/services/fetchArticlesRecommendations/fetchArticleRecommendations';

export const ArticlePageRecommendations = () => {
    const { t } = useTranslation('article');
    const recommendations = useAppSelector(getArticleRecommendations.selectAll);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchArticleRecommendations());
    }, [dispatch]);

    if (!recommendations.length) {
        return;
    }

    return (
        <div className={classes.recommendations}>
            <Heading level={4}>{t('recommendationsHeading')}</Heading>
            <ArticlesList
                view="list"
                isLoading={false}
                articles={recommendations}
                target="_blank"
            />
        </div>
    );
};
