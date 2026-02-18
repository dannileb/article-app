import { Article } from '../model/types/article.types';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget } from 'react';
import { ListRange, VirtuosoGrid, VirtuosoGridProps } from 'react-virtuoso';
import { AppLink } from '#/shared/ui/AppLink/AppLink';
import { generatePath } from 'react-router';
import { RoutePath } from '#/shared/config/routeConfig/routeConfig';
import { ArticleListItem } from '#/entities/Article/ui/ArticleListItem';
import { Loader } from '#/shared/ui/Loader/Loader';
import classes from './ArticlesList.module.scss';
import classNames from 'classnames';

type ArticlesListProps = {
    articles: Article[];
    isLoading: boolean;
    view: 'list' | 'grid';
    target?: HTMLAttributeAnchorTarget;
    endReached?: (index: number) => void;
    onRangeChanged?: (range: ListRange) => void;
    initialTopMostItemIndex?: number;
    className?: string;
};

type ArticleListContext = {
    isLoading: boolean;
};

const gridComponents: VirtuosoGridProps<
    undefined,
    ArticleListContext
>['components'] = {
    Footer: ({ context }) =>
        context.isLoading && (
            <div className={classes.loader}>
                <Loader />
            </div>
        ),
};

export const ArticlesList = ({
    articles,
    isLoading,
    view,
    endReached,
    target,
    onRangeChanged,
    initialTopMostItemIndex = 0,
    className,
}: ArticlesListProps) => {
    const { t } = useTranslation('articlesList');

    if (!articles.length) {
        return <div>{t('noArticles')}</div>;
    }

    return (
        <VirtuosoGrid
            style={{ height: '100%' }}
            data={articles}
            components={gridComponents}
            context={{ isLoading }}
            itemContent={(index) => {
                const article = articles[index];
                if (!article) {
                    return null;
                }
                return (
                    <AppLink
                        to={generatePath(RoutePath.article, {
                            articleId: article.id,
                        })}
                        target={target}
                    >
                        <ArticleListItem
                            key={article.id}
                            listView={view}
                            article={article}
                        />
                    </AppLink>
                );
            }}
            endReached={endReached}
            overscan={20}
            listClassName={classNames(
                classes.cardList,
                classes[`cardList_${view}`],
                className,
            )}
            rangeChanged={onRangeChanged}
            initialTopMostItemIndex={initialTopMostItemIndex}
        />
    );
};
