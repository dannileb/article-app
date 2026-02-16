import { CommentList, CommentType } from '#/entities/Comment';
import { getArticleComments } from '../../model/slice/articleCommentSlice';
import { Heading } from '#/shared/ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { useCallback, useEffect, useState } from 'react';
import {
    getArticleAuthorId,
    getArticleCommentsError,
    getArticleId,
} from '../../model/selectors';
import { fetchArticleComments } from '../../model/services/fetchArticleComments/fetchArticleComments';
import { PagePlaceholder } from '#/widgets/PagePlaceholder/ui/PagePlaceholder';
import { Text } from '#/shared/ui/Text/Text';
import classes from './ArticlePageComments.module.scss';
import { ProfileModal } from '#/entities/Profile';

export const ArticlePageComments = () => {
    const { t } = useTranslation('article');

    const dispatch = useAppDispatch();

    const articleId = useAppSelector(getArticleId);
    const authorId = useAppSelector(getArticleAuthorId);
    const comments = useAppSelector(getArticleComments.selectAll);
    // const isLoading = useAppSelector(getArticleCommentsIsLoading);
    const error = useAppSelector(getArticleCommentsError);

    const [authorModalId, setAuthorModalId] = useState<string>();

    const handleAuthorClick = useCallback((authorId: string) => {
        setAuthorModalId(authorId);
    }, []);

    const handleCloseAuthorModal = useCallback(() => {
        setAuthorModalId(undefined);
    }, []);

    const getIsAuthor = useCallback(
        (comment: CommentType) => {
            if (authorId === undefined) {
                return false;
            }
            return comment.author.id === authorId;
        },
        [authorId],
    );

    useEffect(() => {
        if (articleId !== undefined && __PROJECT__ !== 'storybook') {
            dispatch(fetchArticleComments({ articleId: articleId.toString() }));
        }
    }, [dispatch, articleId]);

    return (
        <>
            {comments.length > 0 ? (
                <div className={classes.commentsWrapper}>
                    <Heading level={4}>{t('commentsHeading')}</Heading>
                    <CommentList
                        comments={comments}
                        onAuthorClick={handleAuthorClick}
                        getIsAuthor={getIsAuthor}
                    />
                </div>
            ) : error ? (
                <PagePlaceholder i18nErrorKey={error} />
            ) : (
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
