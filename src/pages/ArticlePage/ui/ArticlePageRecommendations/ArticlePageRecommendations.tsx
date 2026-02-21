import { Heading } from '#/shared/ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import classes from './ArticlePageRecommendations.module.scss';
import { ArticlesList } from '#/entities/Article';
import { useGetArticleRecommendationsQuery } from '../../api/articleRecommendationsApi';

export const ArticlePageRecommendations = () => {
    const { t } = useTranslation('article');
    const { data: recommendations } = useGetArticleRecommendationsQuery();

    if (!recommendations?.items) {
        return;
    }

    return (
        <div className={classes.recommendations}>
            <Heading level={4}>{t('recommendationsHeading')}</Heading>
            <div className={classes.recommendationsListWrapper}>
                <ArticlesList
                    view="grid"
                    isLoading={false}
                    articles={recommendations.items}
                    target="_blank"
                    className={classes.recommendationsList}
                />
            </div>
        </div>
    );
};
