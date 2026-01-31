import {
    addCommentActions,
    addCommentReducer,
} from '../../model/slice/addCommentSlice';
import { useReducerManager } from '#/shared/lib/hooks/useReducerManager';
import { Input } from '#/shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getAddCommentError, getAddCommentText } from '../../model/selectors';
import { MouseEventHandler, useCallback } from 'react';
import classes from './AddCommentForm.module.scss';
import { Text } from '#/shared/ui/Text/Text';
import { sendComment } from '../../model/services/sendComment';
import { CommentType } from '#/entities/Comment';
import { ResponseError } from '#/shared/types/Axios';

const reducersList = {
    addComment: addCommentReducer,
};

interface AddCommentFormProps {
    entityId: string;
    entityType: 'article';
    onSendComment?: (payload: CommentType | ResponseError | undefined) => void;
}

const AddCommentForm = ({
    entityId,
    entityType,
    onSendComment,
}: AddCommentFormProps) => {
    useReducerManager(reducersList);
    const { t } = useTranslation('translation');
    const { t: tError } = useTranslation('errors');
    const dispatch = useAppDispatch();

    const text = useAppSelector(getAddCommentText);
    const error = useAppSelector(getAddCommentError);

    const handleChangeText = useCallback(
        (value: string) => {
            dispatch(addCommentActions.setText(value));
        },
        [dispatch],
    );

    const handleSendComment: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (e) => {
            e.preventDefault();
            const result = await dispatch(
                sendComment({ entityId, entityType }),
            );
            onSendComment?.(result.payload);
        },
        [dispatch, entityId, entityType, onSendComment],
    );

    return (
        <form className={classes.addCommentForm}>
            <Input
                value={text}
                label={t('commentInputLabel')}
                placeholder={t('commentInputPlaceholder')}
                onChange={handleChangeText}
                onActionButtonClick={handleSendComment}
                withActionButton
            />
            {error && <Text view="error">{tError(error)}</Text>}
        </form>
    );
};

export default AddCommentForm;
