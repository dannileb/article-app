import classes from './ArticlePageBlock.module.scss';
import { Text } from '#/shared/ui/Text/Text';
import { AppImage } from '#/shared/ui/Image/Image';
import { ArticleBlockProps } from './ArticlePageBlock';

export const ArticleImageBlock = ({ block }: ArticleBlockProps) => {
    return (
        <div className={classes.blockWrapper}>
            <AppImage
                src={block.blockContent ?? '#'}
                alt={block.title ?? 'blockImage'}
                className={classes.image}
            />
            {block.title && (
                <Text view="secondary" size="s" align="center">
                    {block.title}
                </Text>
            )}
        </div>
    );
};
