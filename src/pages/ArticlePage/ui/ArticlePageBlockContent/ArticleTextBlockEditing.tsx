import classes from './ArticlePageBlock.module.scss';
import { Input } from '#/shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { useArticlePageEditor } from '#/pages/ArticlePage/ui/useArticlePageEditor';
import classNames from 'classnames';
import { TextArea } from '#/shared/ui/TextArea/TextArea';
import { ArticleBlockProps } from './ArticlePageBlock';

export const ArticleTextBlockEditing = ({
    block,
    index,
}: ArticleBlockProps) => {
    const { t } = useTranslation('article');

    const { handleChangeBlockTitle, handleChangeContent } =
        useArticlePageEditor(index);

    return (
        <div
            className={classNames(
                classes.blockWrapper,
                classes.blockWrapper_editing,
            )}
        >
            <Input
                label={t('textBlockLabel')}
                placeholder={t('blockTitlePlaceholder')}
                value={block.title}
                onChange={handleChangeBlockTitle}
            />
            <TextArea
                label={t('blockContentLabel')}
                view="clear"
                value={block.blockContent}
                placeholder={t('blockContentPlaceholder')}
                onChange={handleChangeContent}
            />
        </div>
    );
};
