import classes from './ArticlePageBlock.module.scss';
import { Text } from '#/shared/ui/Text/Text';
import { CopyButton } from '#/widgets/CopyButton';
import classNames from 'classnames';
import { ArticleBlockProps } from './ArticlePageBlock';

export const ArticleCodeBlock = ({ block }: ArticleBlockProps) => {
    return (
        <div
            className={classNames(
                classes.blockWrapper,
                classes.blockWrapper_code,
            )}
        >
            <CopyButton
                view="clear"
                className={classes.copyButton}
                copyingText={block.blockContent}
            />
            {block.title && (
                <Text view="secondary" size="s" className={classes.codeTitle}>
                    {block.title}
                </Text>
            )}
            <pre>
                <code>{block.blockContent}</code>
            </pre>
        </div>
    );
};
