import { articleActions } from '../model/slice/articleSlice';
import { useAppDispatch } from '#/shared/lib/hooks/reduxHooks';
import { useCallback } from 'react';
import { ArticleBlockType } from '../model/types/article.types';

export const useArticlePageEditor = (blockIndex?: number) => {
    const dispatch = useAppDispatch();

    const handleChangeTitle = useCallback(
        (value?: string) => {
            dispatch(articleActions.setArticleTitle(value || ''));
        },
        [dispatch],
    );

    const handleAddTag = useCallback(
        (value: string) => {
            dispatch(articleActions.addArtcileTag(value));
        },
        [dispatch],
    );

    const handleDeleteTag = useCallback(
        (value?: string) => {
            dispatch(articleActions.deleteArtcileTag(value || ''));
        },
        [dispatch],
    );

    const handleAddBlock = useCallback(
        (type: ArticleBlockType) => {
            dispatch(articleActions.addArticleBlock(type));
        },
        [dispatch],
    );

    const handleChangeBlockTitle = useCallback(
        (value: string) => {
            if (blockIndex === undefined) {
                return;
            }
            dispatch(
                articleActions.setBlockTitle({
                    index: blockIndex,
                    title: value,
                }),
            );
        },
        [blockIndex, dispatch],
    );

    const handleChangeContent = useCallback(
        (value: string) => {
            if (blockIndex === undefined) {
                return;
            }
            dispatch(
                articleActions.setBlockContent({
                    index: blockIndex,
                    content: value,
                }),
            );
        },
        [blockIndex, dispatch],
    );

    return {
        handleChangeTitle,
        handleAddTag,
        handleDeleteTag,
        handleAddBlock,
        handleChangeBlockTitle,
        handleChangeContent,
    };
};
