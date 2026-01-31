import { Input } from '#/shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { ArticleBase } from '#/entities/Article';
import { useArticlePageEditor } from '../useArticlePageEditor';
import { Tag } from '#/shared/ui/Tag/Tag';
import classes from './ArticlePageHeader.module.scss';
import { useCallback, useState } from 'react';

interface ArticlePageHeaderEditorProps {
    formData: ArticleBase;
}

export const ArticlePageHeaderEditor = ({
    formData,
}: ArticlePageHeaderEditorProps) => {
    const { t } = useTranslation('article');
    const { handleChangeTitle, handleDeleteTag, handleAddTag } =
        useArticlePageEditor();

    const [newTag, setNewTag] = useState<string>('');

    const handleNewTagChange = useCallback(
        (value: string) => {
            const lastChar = value.at(-1) ?? '';

            if (/[,;\s]/.test(lastChar)) {
                const newTag = value.slice(0, -1).trim();

                setNewTag('');

                handleAddTag(newTag);
            } else {
                setNewTag(value);
            }
        },
        [handleAddTag],
    );

    return (
        <div className={classes.headerEditor}>
            <Input
                value={formData.title}
                placeholder={t('titlePlaceholder')}
                label={t('titleLabel')}
                onChange={handleChangeTitle}
                required
            />
            <div className={classes.articleTags}>
                {formData.tags.map((tag) => (
                    <Tag key={tag} deletable onDelete={handleDeleteTag}>
                        {tag}
                    </Tag>
                ))}
            </div>
            <Input
                className={classes.addTagInput}
                value={newTag}
                label={t('tags')}
                placeholder={t('tagsInputPlaceholder')}
                onChange={handleNewTagChange}
            />
        </div>
    );
};
