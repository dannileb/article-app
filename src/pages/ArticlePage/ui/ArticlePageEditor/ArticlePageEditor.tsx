import { getArticleData, getArticleForm } from '../../model/selectors';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { ArticlePageHeaderEditor } from '../ArticlePageHeader/ArticlePageHeaderEditor';
import PageLoader from '#/shared/ui/PageLoader';
import { Heading } from '#/shared/ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import classes from '../ArticlePage.module.scss';
import { ArticlePageBlock } from '../ArticlePageBlockContent/ArticlePageBlock';
import { Button } from '#/shared/ui/Button/Button';
import { useCallback, useMemo, useState } from 'react';
import { ArticlePageHeader } from '../ArticlePageHeader/ArticlePageHeader';
import { Article } from '../../model/types/article.types';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { ArticlePageToolbar } from '../ArticlePageToolbar/ArticlePageToolbar';

export const ArticlePageEditor = () => {
    const { t } = useTranslation('article');
    const formData = useAppSelector(getArticleForm);
    const articleData = useAppSelector(getArticleData);

    const [isPreview, setIsPreview] = useState<boolean>(false);

    const togglePreview = useCallback(() => {
        setIsPreview((prev) => !prev);
    }, []);

    const previewFormData = useMemo((): Article | undefined => {
        if (articleData === undefined || formData === undefined) {
            return;
        }
        return {
            ...articleData,
            ...formData,
        };
    }, [articleData, formData]);

    if (formData === undefined) {
        return <PageLoader />;
    }
    return (
        <div className={classes.editorWrapper}>
            <Heading>{t('editorHeading')}</Heading>
            <Button
                view="clear"
                icon={isPreview ? <EditOutlined /> : <EyeOutlined />}
                className={classes.previewButton}
                onClick={togglePreview}
            >
                {isPreview ? t('edit') : t('preview')}
            </Button>
            <div className={classes.editorContent}>
                {isPreview && previewFormData !== undefined ? (
                    <ArticlePageHeader articleData={previewFormData} />
                ) : (
                    <ArticlePageHeaderEditor formData={formData} />
                )}
                <div className={classes.contentWrapper}>
                    {formData.content.map((block, index) => (
                        <ArticlePageBlock
                            key={index}
                            index={index}
                            block={block}
                            editing={!isPreview}
                        />
                    ))}
                </div>
            </div>
            {!isPreview && <ArticlePageToolbar />}
        </div>
    );
};
