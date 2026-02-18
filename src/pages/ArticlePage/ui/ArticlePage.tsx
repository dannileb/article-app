import { articleReducer } from '../model/slice/articleSlice';
import {
    DynamicModuleLoader,
    ReducersList,
} from '#/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { fetchArticleById } from '../model/services/fetchArticleById/fetchArticleById';
import { useParams } from 'react-router';
import {
    getArticleData,
    getArticleError,
    getArticleIsEditing,
    getArticleIsLoading,
} from '../model/selectors';
import PageLoader from '#/shared/ui/PageLoader';
import { PagePlaceholder } from '#/widgets/PagePlaceholder/ui/PagePlaceholder';
import { useTranslation } from 'react-i18next';
import { getUserIsAuth } from '#/entities/User';
import { ArticlePageEditor } from './ArticlePageEditor/ArticlePageEditor';
import { articlePageReducer } from '../model/slice';
import { ArticlePageViewer } from './ArticlePageViewer/ArticlePageViewer';

const initialRedusers: ReducersList = {
    article: articleReducer,
    articlePage: articlePageReducer,
};

export function ArticlePage() {
    useTranslation('article');

    const { articleId } = useParams<{ articleId: string }>();
    const isAuthenticated = useAppSelector(getUserIsAuth);
    const articleData = useAppSelector(getArticleData);
    const isLoading = useAppSelector(getArticleIsLoading);
    const isEditing = useAppSelector(getArticleIsEditing);
    const error = useAppSelector(getArticleError);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (articleId && __PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById({ articleId }));
        }
    }, [dispatch, articleId, isAuthenticated]);

    return (
        <DynamicModuleLoader reducers={initialRedusers}>
            <PageLoader view="secondary" show={isLoading} />
            {articleData ? (
                isEditing ? (
                    <ArticlePageEditor />
                ) : (
                    <ArticlePageViewer articleData={articleData} />
                )
            ) : (
                <PagePlaceholder i18nErrorKey={error} />
            )}
        </DynamicModuleLoader>
    );
}

export default ArticlePage;
