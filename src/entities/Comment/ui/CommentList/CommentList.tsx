import { memo } from 'react';
import { CommentType } from '../../model/types/comment.types';
import { CommentItem } from '../CommentItem/CommentItem';
import classes from './CommentList.module.scss';

interface CommentListProps {
    comments: CommentType[];
    onAuthorClick?: (authorId: string) => void;
    getIsAuthor?: (comment: CommentType) => boolean;
}

const CommentListInner = ({
    comments,
    onAuthorClick,
    getIsAuthor,
}: CommentListProps) => {
    return (
        <div className={classes.commentList}>
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onAuthorClick={onAuthorClick}
                    isAuthor={getIsAuthor?.(comment) || false}
                />
            ))}
        </div>
    );
};

export const CommentList = memo(CommentListInner);
