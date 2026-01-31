import {
    articlesListPageSlice,
    getArticles,
} from '../model/slices/articlesPageSlice';
import {
    DynamicModuleLoader,
    ReducersList,
} from '#/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import classes from './ArticleListPage.module.scss';
import { Heading } from '#/shared/ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { generatePath } from 'react-router';
import { RoutePath } from '#/shared/config/routeConfig/routeConfig';
import { ArticleListItem } from './ArticleListItem';
import classNames from 'classnames';
import { getArticlesListView } from '../model/selectors/getArticlesListView';
import { getArticlesListIsLoading } from '../model/selectors/getAriclesListIsLoading';
import { ArticlesListToolbar } from './ArticlesListToolbar';
import { useInfiniteScroll } from '#/shared/lib/hooks/useInfiniteScroll';
import { fetchNextArticlesListPage } from '../model/services/fetchNextArticlesListPage/fetchNextArticlesListPage';
import { Loader } from '#/shared/ui/Loader/Loader';
import { getArticlesListLastPage } from '../model/selectors/getArticlesListLastPage';
import { useDebounce } from '#/shared/lib/hooks/useDebounce';
import {
    getScrollPositionByKey,
    preserveSrollPositionActions,
} from '#/features/PreserveScrollPosition';
import { getArticlesListPageInited } from '../model/selectors/getArticlesListPageInited';

const reducers: ReducersList = {
    articlesList: articlesListPageSlice.reducer,
};

const ArticlesListPage = () => {
    const { t } = useTranslation('articlesList');
    const dispatch = useAppDispatch();
    const view = useAppSelector(getArticlesListView) ?? 'grid';
    const isLoading = useAppSelector(getArticlesListIsLoading);
    const lastPage = useAppSelector(getArticlesListLastPage);
    const articles = useAppSelector(getArticles.selectAll);
    const scrollPosition = useAppSelector((state) =>
        getScrollPositionByKey(state, 'articlesList'),
    );
    const inited = useAppSelector(getArticlesListPageInited);
    const navigate = useNavigate();

    const handleScrollEnd = useCallback(() => {
        if (isLoading || lastPage) {
            return;
        }
        dispatch(fetchNextArticlesListPage());
        dispatch(articlesListPageSlice.actions.addCurrentPage());
    }, [dispatch, isLoading, lastPage]);

    const { wrapperRef, triggerRef } = useInfiniteScroll(handleScrollEnd, {
        rootMargin: '0px 0px 30% 0px',
        threshold: 0,
    });

    const handleScroll = useDebounce((e: React.UIEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLElement) {
            dispatch(
                preserveSrollPositionActions.setScrollPosition({
                    key: 'articlesList',
                    value: e.target.scrollTop,
                }),
            );
        }
    }, 200);

    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollTop = scrollPosition;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!inited) {
            dispatch(articlesListPageSlice.actions.initState());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div
                ref={wrapperRef}
                className={classes.pageContainer}
                onScroll={handleScroll}
            >
                <Heading level={1}>{t('articlesList-heading')}</Heading>
                <ArticlesListToolbar />
                <div
                    className={classNames(
                        classes.cardList,
                        classes[`cardList_${view}`],
                    )}
                >
                    {articles.map((article) => (
                        <ArticleListItem
                            key={article.id}
                            listView={view}
                            article={article}
                            onClick={() =>
                                navigate(
                                    generatePath(RoutePath.article, {
                                        articleId: article.id,
                                    }),
                                )
                            }
                        />
                    ))}
                    {isLoading && (
                        <div className={classes.loader}>
                            <Loader />
                        </div>
                    )}
                    <div
                        ref={triggerRef}
                        aria-hidden="true"
                        style={{
                            marginTop: articles.length ? '-26px' : undefined,
                            height: '10px',
                        }}
                    />
                </div>
            </div>
        </DynamicModuleLoader>
    );
};

export default ArticlesListPage;
