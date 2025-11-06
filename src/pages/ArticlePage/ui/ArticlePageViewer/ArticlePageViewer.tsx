import { ArticlePageBlock } from '../ArticlePageBlockContent/ArticlePageBlock';
import { Article } from '../../model/types/article.types';
import { ArticlePageHeader } from '../ArticlePageHeader/ArticlePageHeader';
import classes from '../ArticlePage.module.scss';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getArticleIsReadonly } from '../../model/selectors';

interface ArticlePageViewerProps {
    articleData: Article;
}

export const ArticlePageViewer = ({ articleData }: ArticlePageViewerProps) => {
    const readonly = useAppSelector(getArticleIsReadonly);
    return (
        <>
            <ArticlePageHeader articleData={articleData} readonly={readonly} />
            <div className={classes.contentWrapper}>
                {articleData.content.map((block, index) => (
                    <ArticlePageBlock key={index} block={block} index={index} />
                ))}
            </div>
        </>
    );
};
