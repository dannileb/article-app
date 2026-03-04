import { Card } from '#/shared/ui/Card/Card';
import { Heading } from '#/shared/ui/Heading/Heading';
import { Tag } from '#/shared/ui/Tag/Tag';
import { Text } from '#/shared/ui/Text/Text';
import classes from './ArticleListCard.module.scss';
import { ArticleListItemProps } from './ArticleListItem';
import { EyeOutlined } from '@ant-design/icons';
import { AppImage } from '#/shared/ui/Image/Image';

const MAX_TAGS_COUNT = 3;

export const ArticleListCard = ({
    article,
    ...cardProps
}: Omit<ArticleListItemProps, 'listView'>) => {
    return (
        <Card view="clear" className={classes.articleCard} {...cardProps}>
            <AppImage
                src={article.preview}
                alt={article.title}
                className={classes.preview}
            />
            <div className={classes.content}>
                <Heading level={4}>{article.title}</Heading>
                <Text size="s" view="secondary" className={classes.description}>
                    {article.description}
                </Text>
                <div className={classes.footer}>
                    <div className={classes.publishedInfo}>
                        <Text view="secondary">{article.createdAt}</Text>
                        <Text>@{article.author.username}</Text>
                        <div className={classes.views}>
                            <Text>{article.views ?? 0}</Text>
                            <EyeOutlined />
                        </div>
                    </div>
                    <div className={classes.tags}>
                        {article.tags.slice(0, MAX_TAGS_COUNT).map((tag) => (
                            <Tag size="s" key={tag}>
                                {tag}
                            </Tag>
                        ))}
                        {article.tags.length > MAX_TAGS_COUNT && (
                            <Text size="s" view="secondary">{`+${
                                article.tags.length - MAX_TAGS_COUNT
                            }`}</Text>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};
