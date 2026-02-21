import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { Suspense, useCallback } from 'react';
import { getArticleAuthorId, getArticleId } from '../../model/selectors';
import { CommentsList } from '#/features/Comments';
import { CommentType } from '#/entities/Comment';
import { Loader } from '#/shared/ui/Loader/Loader';

export const ArticlePageComments = () => {
    const articleId = useAppSelector(getArticleId);
    const authorId = useAppSelector(getArticleAuthorId);

    const getIsAuthor = useCallback(
        (comment: CommentType) => {
            if (authorId === undefined) {
                return false;
            }
            return comment.author.id === authorId;
        },
        [authorId],
    );
    if (!articleId) {
        return;
    }

    return (
        <Suspense fallback={<Loader />}>
            <CommentsList
                entityId={articleId}
                entityType="article"
                getIsAuthor={getIsAuthor}
            />
        </Suspense>
    );
};
