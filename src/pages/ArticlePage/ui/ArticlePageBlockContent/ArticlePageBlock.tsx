import { memo, useCallback } from 'react';
import {
    ArticleBlockType,
    IArticleBlock,
} from '../../model/types/article.types';
import { ArticleTextBlock } from './ArticleTextBlock';
import { ArticleImageBlock } from './ArticleImageBlock';
import { ArticleCodeBlock } from './ArticleCodeBlock';
import { ArticleTextBlockEditing } from './ArticleTextBlockEditing';
import { ArticleImageBlockEditing } from './ArticleImageBlockEditing';
import { ArticleCodeBlockEditing } from './ArticleCodeBlockEditing';
import { Button } from '#/shared/ui/Button/Button';
import { DeleteOutlined } from '@ant-design/icons';
import classes from './ArticlePageBlock.module.scss';
import { useAppDispatch } from '#/shared/lib/hooks/reduxHooks';
import { articleActions } from '../../model/slice/articleSlice';

export interface ArticleBlockProps {
    block: IArticleBlock;
    editing?: boolean;
    index: number;
}

const ARTICLE_BLOCKS_MAP: Record<
    ArticleBlockType,
    React.FC<ArticleBlockProps>
> = {
    text: ArticleTextBlock,
    image: ArticleImageBlock,
    code: ArticleCodeBlock,
};

const ARTICLE_EDITING_BLOCKS_MAP: Record<
    ArticleBlockType,
    React.FC<ArticleBlockProps>
> = {
    text: ArticleTextBlockEditing,
    image: ArticleImageBlockEditing,
    code: ArticleCodeBlockEditing,
};

export const ArticlePageBlock = memo(
    ({ block, index, editing = false }: ArticleBlockProps) => {
        const BlockComponent = editing
            ? ARTICLE_EDITING_BLOCKS_MAP[block.type]
            : ARTICLE_BLOCKS_MAP[block.type];

        const dispatch = useAppDispatch();

        const handleDeleteBlock = useCallback(
            (index: number) => {
                dispatch(articleActions.deleteArticleBlock(index));
            },
            [dispatch],
        );

        if (editing) {
            return (
                <div className={classes.editingBlock}>
                    <Button
                        onClick={() => handleDeleteBlock(index)}
                        view="clear"
                        icon={<DeleteOutlined />}
                    />
                    <BlockComponent
                        key={index}
                        index={index}
                        block={block}
                        editing
                    />
                </div>
            );
        }
        return <BlockComponent block={block} editing={editing} index={index} />;
    },
);
