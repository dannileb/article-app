import { Avatar } from '#/shared/ui/Avatar/Avatar';
import { Text } from '#/shared/ui/Text/Text';
import { memo, useCallback } from 'react';
import { CommentType } from '../../model/types/comment.types';
import classes from './CommentItem.module.scss';
import classNames from 'classnames';
import { Tag } from '#/shared/ui/Tag/Tag';
import { useTranslation } from 'react-i18next';

interface CommentItemProps {
    comment: CommentType;
    onAuthorClick?: (authorId: string) => void;
    isAuthor: boolean;
}

const CommentItemInner = ({
    comment,
    onAuthorClick,
    isAuthor,
}: CommentItemProps) => {
    const { t } = useTranslation('translation');
    const handleAuthorClick = useCallback(() => {
        onAuthorClick?.(comment.author.id);
    }, [comment.author.id, onAuthorClick]);

    return (
        <div className={classes.commentItem}>
            <div
                className={classNames(classes.authorWrapper, {
                    [classes.authorWrapper_clickable]:
                        onAuthorClick !== undefined,
                })}
                onClick={handleAuthorClick}
            >
                <Avatar
                    src={comment.author.photo}
                    size={30}
                    alt={`${comment.author.username}_photo`}
                />
                <Text>@{comment.author.username}</Text>
                {isAuthor && <Tag size="s">{t('author')}</Tag>}
                <Text view="secondary" size="s">
                    {comment.createdAt}
                </Text>
            </div>
            <Text>{comment.text}</Text>
        </div>
    );
};

export const CommentItem = memo(CommentItemInner);
