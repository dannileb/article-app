import { ArticlePageBlock } from '../ArticlePageBlockContent/ArticlePageBlock';
import { Article } from '#/entities/Article';
import { ArticlePageHeader } from '../ArticlePageHeader/ArticlePageHeader';
import classes from '../ArticlePage.module.scss';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getArticleIsReadonly } from '../../model/selectors';
import { ArticlePageComments } from '../ArticlePageComments/ArticlePageComments';
import { useTranslation } from 'react-i18next';
import { Button } from '#/shared/ui/Button/Button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { RoutePath } from '#/shared/config/routeConfig/routeConfig';
import { ArticlePageRecommendations } from '../ArticlePageRecommendations/ArticlePageRecommendations';

interface ArticlePageViewerProps {
    articleData: Article;
}

export const ArticlePageViewer = ({ articleData }: ArticlePageViewerProps) => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const readonly = useAppSelector(getArticleIsReadonly);

    return (
        <div className={classes.contentWrapper}>
            <Button
                view="clear"
                icon={<ArrowLeftOutlined />}
                className={classes.backButton}
                onClick={() => {
                    navigate(RoutePath.articles);
                }}
            >
                {t('goBack')}
            </Button>
            <ArticlePageHeader articleData={articleData} readonly={readonly} />
            <div className={classes.contentWrapper}>
                {articleData.content.map((block, index) => (
                    <ArticlePageBlock key={index} block={block} index={index} />
                ))}
            </div>
            <ArticlePageRecommendations />
            <ArticlePageComments />
        </div>
    );
};
