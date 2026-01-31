import { Article } from '#/entities/Article';
import { CardProps } from '#/shared/ui/Card/Card';
import { ArticlesListView } from '../model/types/articlesList.types';
import { ArticleListCard } from './ArticleListCard';
import { ArticleListRow } from './ArticleListRow';

export interface ArticleListItemProps extends CardProps {
    listView: ArticlesListView;
    article: Article;
}

export const ArticleListItem = ({
    listView,
    ...props
}: ArticleListItemProps) => {
    if (listView === 'grid') {
        return <ArticleListCard {...props} />;
    }
    return <ArticleListRow {...props} />;
};
