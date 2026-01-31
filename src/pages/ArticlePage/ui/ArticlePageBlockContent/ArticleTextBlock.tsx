import classes from './ArticlePageBlock.module.scss';
import { Heading } from '#/shared/ui/Heading/Heading';
import { Text } from '#/shared/ui/Text/Text';
import { IArticleBlock } from '#/entities/Article';

export const ArticleTextBlock = ({ block }: { block: IArticleBlock }) => {
    return (
        <div className={classes.blockWrapper}>
            {block.title && <Heading level={2}>{block.title}</Heading>}
            <Text>{block.blockContent}</Text>
        </div>
    );
};
