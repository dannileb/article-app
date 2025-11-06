import classes from './ArticlePageBlock.module.scss';
import { Text } from '#/shared/ui/Text/Text';
import { Image } from '#/shared/ui/Image/Image';
import { ArticleBlockProps } from './ArticlePageBlock';

export const ArticleImageBlock = ({ block }: ArticleBlockProps) => {
    return (
        <div className={classes.blockWrapper}>
            <Image
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
