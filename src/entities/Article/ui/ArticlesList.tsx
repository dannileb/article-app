import classNames from 'classnames';
import classes from './ArticlesList.module.scss';
import { ArticleListItem } from './ArticleListItem';
import { Article } from '../model/types/article.types';
import { generatePath } from 'react-router';
import { RoutePath } from '#/shared/config/routeConfig/routeConfig';
import { Loader } from '#/shared/ui/Loader/Loader';
import { Text } from '#/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { AppLink } from '#/shared/ui/AppLink/AppLink';
import { HTMLAttributeAnchorTarget } from 'react';

type ListWithVirtualScroll =
    | {
          virtualScroll: true;
          triggerRef: React.RefObject<HTMLDivElement | null>;
      }
    | {
          virtualScroll?: false;
          triggerRef?: never;
      };

type ArticlesListProps = {
    articles: Article[];
    isLoading: boolean;
    view: 'list' | 'grid';
    target?: HTMLAttributeAnchorTarget;
} & ListWithVirtualScroll;

export const ArticlesList = ({
    articles,
    isLoading,
    view,
    triggerRef,
    target,
}: ArticlesListProps) => {
    const { t } = useTranslation('articlesList');

    return (
        <div
            className={classNames(
                classes.cardList,
                classes[`cardList_${view}`],
            )}
        >
            {articles.map((article) => (
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
            ))}
            {isLoading ? (
                <div className={classes.loader}>
                    <Loader />
                </div>
            ) : (
                !articles.length && <Text>{t('noArticles')}</Text>
            )}
            <div
                ref={triggerRef}
                aria-hidden="true"
                style={{
                    marginTop: articles.length ? '-26px' : undefined,
                    height: '10px',
                }}
            />
        </div>
    );
};
