import { memo, useCallback, useState } from 'react';
import classes from './CommentsList.module.scss';
import { CommentItem, CommentType } from '#/entities/Comment';
import { AddCommentForm } from '../AddCommentForm/AddCommentForm';
import { EntityType } from '../../model/types/comments.types';
import { Heading } from '#/shared/ui/Heading/Heading';
import { Text } from '#/shared/ui/Text/Text';
import { ProfileModal } from '#/entities/Profile';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getUserIsAuth } from '#/entities/User';
import { useGetCommentsQuery } from '../../api/commentsApi';
import { useTranslation } from 'react-i18next';

interface CommentListProps {
    entityId: string;
    entityType: EntityType;
    getIsAuthor?: (comment: CommentType) => boolean;
}

const CommentListInner = ({
    entityId,
    entityType,
    getIsAuthor,
}: CommentListProps) => {
    const { t } = useTranslation();
    const isAuth = useAppSelector(getUserIsAuth);
    const { data: comments } = useGetCommentsQuery({ entityId, entityType });

    const [authorModalId, setAuthorModalId] = useState<string>();

    const handleAuthorClick = useCallback((authorId: string) => {
        setAuthorModalId(authorId);
    }, []);

    const handleCloseAuthorModal = useCallback(() => {
        setAuthorModalId(undefined);
    }, []);
    return (
        <>
            {isAuth ? (
                <AddCommentForm entityId={entityId} entityType={entityType} />
            ) : (
                <Text view="secondary">{t('authoToComment')}</Text>
            )}
            {comments?.data?.length ? (
                <div className={classes.commentsWrapper}>
                    <Heading level={4}>{t('commentsHeading')}</Heading>
                    <div className={classes.commentList}>
                        {comments.data?.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                onAuthorClick={handleAuthorClick}
                                isAuthor={getIsAuthor?.(comment) || false}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                // ) : error ? (
                //     <PagePlaceholder i18nErrorKey={error} />
                <Text>{t('noComments')}</Text>
            )}
            <ProfileModal
                profileId={authorModalId}
                isOpen={authorModalId !== undefined}
                onClickOutside={handleCloseAuthorModal}
            />
        </>
    );
};

export default memo(CommentListInner) as typeof CommentListInner;
