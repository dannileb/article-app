import { Card } from '#/shared/ui/Card/Card';
import classes from './ArticleListRow.module.scss';
import { Heading } from '#/shared/ui/Heading/Heading';
import { Tag } from '#/shared/ui/Tag/Tag';
import { Text } from '#/shared/ui/Text/Text';
import { ArticleListItemProps } from './ArticleListItem';
import avatarPlaceholder from '#/shared/assets/images/avatarPlaceholder.webp';
import { EyeOutlined } from '@ant-design/icons';

const MAX_TAGS_COUNT = 5;

export const ArticleListRow = ({
    article,
    ...props
}: Omit<ArticleListItemProps, 'listView'>) => {
    return (
        <Card width="100%" className={classes.articleRow} {...props}>
            <img
                src={article.preview}
                alt={article.title}
                className={classes.preview}
                onError={(e) => {
                    console.log(e);
                    e.currentTarget.src = avatarPlaceholder;
                    e.currentTarget.onerror = null;
                }}
            />
            <div className={classes.content}>
                <Heading level={4}>{article.title}</Heading>
                <Text size="s" view="secondary" className={classes.description}>
                    {article.description}
                </Text>
                <div className={classes.footer}>
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
                    <div className={classes.publishedInfo}>
                        <Text view="secondary">{article.createdAt}</Text>
                        <Text>@{article.author.username}</Text>
                        <div className={classes.views}>
                            <Text>{article.views ?? 0}</Text>
                            <EyeOutlined />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
