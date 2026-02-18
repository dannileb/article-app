import { ArticlePageBlock } from '../ArticlePageBlockContent/ArticlePageBlock';
import { Article } from '#/entities/Article';
import { ArticlePageHeader } from '../ArticlePageHeader/ArticlePageHeader';
import classes from '../ArticlePage.module.scss';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getArticleIsReadonly } from '../../model/selectors';
import { ArticlePageComments } from '../ArticlePageComments/ArticlePageComments';
import { AddCommentForm } from '#/features/AddComment';
import { Suspense, useCallback } from 'react';
import { getUserIsAuth } from '#/entities/User';
import { Text } from '#/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { ResponseError } from '#/shared/types/Axios';
import { CommentType } from '#/entities/Comment';
import { articleCommentsActions } from '../../model/slice/articleCommentSlice';
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
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const readonly = useAppSelector(getArticleIsReadonly);
    const isAuth = useAppSelector(getUserIsAuth);

    const handleSendComment = useCallback(
        (payload: ResponseError | CommentType | undefined) => {
            if (payload && 'text' in payload) {
                dispatch(articleCommentsActions.addComment(payload));
            }
        },
        [dispatch],
    );

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
            {isAuth ? (
                <Suspense fallback={<></>}>
                    <AddCommentForm
                        entityId={articleData.id}
                        entityType="article"
                        onSendComment={handleSendComment}
                    />
                </Suspense>
            ) : (
                <Text view="secondary">{t('authoToComment')}</Text>
            )}
            <ArticlePageComments />
        </div>
    );
};
