import { Input } from '#/shared/ui/Input/Input';
import { useState } from 'react';
import classes from './AddCommentForm.module.scss';
import { useAddCommentMutation } from '../../api/commentsApi';
import { useTranslation } from 'react-i18next';

interface AddCommentFormProps {
    entityId: string;
    entityType: 'article';
}

export const AddCommentForm = ({
    entityId,
    entityType,
}: AddCommentFormProps) => {
    const { t } = useTranslation();
    // const { t: tError } = useTranslation('errors');
    const [addComment] = useAddCommentMutation();

    const [text, setText] = useState<string>('');

    const handleSendComment = () => {
        addComment({ entityId, entityType, text });
        setText('');
    };

    return (
        <form
            className={classes.addCommentForm}
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <Input
                value={text}
                label={t('commentInputLabel')}
                placeholder={t('commentInputPlaceholder')}
                onChange={setText}
                onActionButtonClick={handleSendComment}
                withActionButton
            />
            {/* {error && <Text view="error">{tError(error)}</Text>} */}
        </form>
    );
};
