import { useCallback, useState } from 'react';
import { Article } from '../../model/types/article.types';
import { Heading } from '#/shared/ui/Heading/Heading';
import classes from './ArticlePageHeader.module.scss';
import { Text } from '#/shared/ui/Text/Text';
import { Button } from '#/shared/ui/Button/Button';
import { ProfileModal } from '#/entities/Profile';
import { useAppDispatch } from '#/shared/lib/hooks/reduxHooks';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons';
import { articleActions } from '../../model/slice/articleSlice';
import { Tag } from '#/shared/ui/Tag/Tag';

interface ArticlePageAuthorModalProps {
    articleData: Article;
    readonly?: boolean;
}

export const ArticlePageHeader = ({
    articleData,
    readonly = true,
}: ArticlePageAuthorModalProps) => {
    const { t } = useTranslation('article');

    const dispatch = useAppDispatch();
    const [isAuthorModalOpen, setIsAuthorModalOpen] = useState<boolean>(false);

    const handleCloseAuthorModal = useCallback(() => {
        setIsAuthorModalOpen(false);
    }, []);

    const handleOpenAuthorModal = useCallback(() => {
        setIsAuthorModalOpen(true);
    }, []);

    const handleEditArticle = useCallback(() => {
        dispatch(articleActions.edit());
    }, [dispatch]);

    return (
        <div className={classes.header}>
            <Heading>{articleData.title}</Heading>
            <div className={classes.articleInfo}>
                <Button view="link" onClick={handleOpenAuthorModal}>
                    @{articleData.author.username}
                </Button>
                <Text view="secondary">{articleData.createdAt}</Text>
            </div>
            <div className={classes.articleTags}>
                {articleData.tags.map((tag) => (
                    <Tag key={tag} size="s">
                        {tag}
                    </Tag>
                ))}
            </div>
            {!readonly && (
                <Button
                    icon={<EditOutlined />}
                    className={classes.editButton}
                    onClick={handleEditArticle}
                >
                    {t('editArticle')}
                </Button>
            )}
            <ProfileModal
                profileId={articleData.author.id.toString()}
                isOpen={isAuthorModalOpen}
                onClickOutside={handleCloseAuthorModal}
            />
        </div>
    );
};
