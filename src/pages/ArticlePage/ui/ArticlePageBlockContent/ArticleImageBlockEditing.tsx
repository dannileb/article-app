import classes from './ArticlePageBlock.module.scss';
import { AppImage } from '#/shared/ui/Image/Image';
import { useArticlePageEditor } from '../useArticlePageEditor';
import { Input } from '#/shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { ArticleBlockProps } from './ArticlePageBlock';

export const ArticleImageBlockEditing = ({
    block,
    index,
}: ArticleBlockProps) => {
    const { t } = useTranslation('article');

    const { handleChangeContent, handleChangeBlockTitle } =
        useArticlePageEditor(index);
    return (
        <div
            className={classNames(
                classes.blockWrapper,
                classes.blockWrapper_editing,
            )}
        >
            <AppImage
                src={block.blockContent ?? '#'}
                alt={block.title}
                className={classes.image}
            />
            <Input
                label={t('imageLink')}
                value={block.blockContent}
                placeholder={t('imageLingPlaceholder')}
                onChange={handleChangeContent}
                required
            />
            <Input
                label={t('imageDescription')}
                value={block.title}
                placeholder={t('imageCaptionPlaceholder')}
                onChange={handleChangeBlockTitle}
            />
        </div>
    );
};
