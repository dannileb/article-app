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
            {block.title ? (
                <div className={classes.codeTitleWrapper}>
                    <Text view="secondary" size="s">
                        {block.title}
                    </Text>
                    <CopyButton view="clear" copyingText={block.blockContent} />
                </div>
            ) : (
                <CopyButton
                    view="clear"
                    className={classes.copyButton_absolute}
                    copyingText={block.blockContent}
                />
            )}
            <pre>
                <code>{block.blockContent}</code>
            </pre>
        </div>
    );
};
