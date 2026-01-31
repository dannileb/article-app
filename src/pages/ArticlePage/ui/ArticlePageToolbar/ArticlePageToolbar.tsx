import { ArticleBlockType } from '#/entities/Article';
import { Button } from '#/shared/ui/Button/Button';
import { Select } from '#/shared/ui/Select/Select';
import { PlusOutlined } from '@ant-design/icons';
import classes from './ArticlePageToolbar.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { memo, useCallback, useMemo, useState } from 'react';
import { articleActions } from '../../model/slice/articleSlice';
import { updateArticle } from '../../model/services/updateArticle/updateArticle';
import { getArticleUpdateError } from '#/pages/ArticlePage/model/selectors/article/getArticleUpdateError';
import { Text } from '#/shared/ui/Text/Text';

const ArticlePageToolbarInner = () => {
    const { t } = useTranslation('article');
    const { t: tError } = useTranslation('error');

    const dispatch = useAppDispatch();
    const updateError = useAppSelector(getArticleUpdateError);

    const [addingBlockType, setAddingBlockType] =
        useState<ArticleBlockType>('text');

    const handleSave = useCallback(() => {
        dispatch(updateArticle());
    }, [dispatch]);

    const handleCancelEdit = useCallback(() => {
        dispatch(articleActions.cancelEdit());
    }, [dispatch]);

    const handleAddBlock = useCallback(() => {
        dispatch(articleActions.addArticleBlock(addingBlockType));
    }, [dispatch, addingBlockType]);

    const blockTypeItems = useMemo(
        () => [
            {
                label: t('textBlockLabel'),
                value: 'text',
            },
            {
                label: t('codeBlockLabel'),
                value: 'code',
            },
            {
                label: t('imageblockLabel'),
                value: 'image',
            },
        ],
        [t],
    );
    return (
        <div className={classes.toolbarContainer}>
            {updateError && <Text view="error">{tError(updateError)}</Text>}
            <div className={classes.toolbar}>
                <div className={classes.addBlockContainer}>
                    <Select
                        label={t('blockType')}
                        value={addingBlockType}
                        items={blockTypeItems}
                        onChange={(value) => {
                            setAddingBlockType(value as ArticleBlockType);
                        }}
                    />
                    <Button
                        view="secondary"
                        icon={<PlusOutlined />}
                        onClick={handleAddBlock}
                    >
                        {t('addBlockBtn')}
                    </Button>
                </div>
                <div className={classes.processButtons}>
                    <Button view="secondary" onClick={handleCancelEdit}>
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleSave}>{t('save')}</Button>
                </div>
            </div>
        </div>
    );
};

export const ArticlePageToolbar = memo(ArticlePageToolbarInner);
