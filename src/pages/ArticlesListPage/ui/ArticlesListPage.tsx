import {
    articlesListPageSlice,
    getArticles,
} from '../model/slices/articlesPageSlice';
import {
    DynamicModuleLoader,
    ReducersList,
} from '#/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import classes from './ArticleListPage.module.scss';
import { Heading } from '#/shared/ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import { getArticlesListView } from '../model/selectors/getArticlesListView';
import { getArticlesListIsLoading } from '../model/selectors/getAriclesListIsLoading';
import { ArticlesListToolbar } from './ArticlesListToolbar';
import { fetchNextArticlesListPage } from '../model/services/fetchNextArticlesListPage/fetchNextArticlesListPage';
import { getArticlesListLastPage } from '../model/selectors/getArticlesListLastPage';
import { useDebounce } from '#/shared/lib/hooks/useDebounce';
import {
    getScrollPositionByKey,
    preserveSrollPositionActions,
} from '#/features/PreserveScrollPosition';
import { getArticlesListPageInited } from '../model/selectors/getArticlesListPageInited';
import { SEARCH_URL_PARAM_KEY, SORT_URL_PARAM_KEY } from '../lib/constants';
import { ArticlesList } from '#/entities/Article';
import { ListRange } from 'react-virtuoso';

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
    const [searchParams] = useSearchParams();

    const handleScrollEnd = useCallback(() => {
        if (isLoading || lastPage) {
            return;
        }
        dispatch(articlesListPageSlice.actions.addCurrentPage());
        dispatch(fetchNextArticlesListPage({}));
    }, [dispatch, isLoading, lastPage]);

    const handleRangeChange = useDebounce((range: ListRange) => {
        dispatch(
            preserveSrollPositionActions.setScrollPosition({
                key: 'articlesList',
                value: (range.startIndex + range.endIndex) / 2,
            }),
        );
    }, 200);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchNextArticlesListPage({}));
        }
    }, [dispatch, inited]);

    useEffect(() => {
        if (!inited) {
            const sort = searchParams.get(SORT_URL_PARAM_KEY) ?? '';
            const searchKey = searchParams.get(SEARCH_URL_PARAM_KEY) ?? '';
            dispatch(
                articlesListPageSlice.actions.initState({
                    sort,
                    searchKey,
                }),
            );
        }
    }, [dispatch, inited, searchParams]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div className={classes.pageContainer}>
                <Heading level={1}>{t('articlesList-heading')}</Heading>
                <ArticlesListToolbar />
                <div className={classes.cardListWrapper}>
                    <ArticlesList
                        articles={articles}
                        isLoading={!!isLoading}
                        view={view}
                        endReached={handleScrollEnd}
                        onRangeChanged={handleRangeChange}
                        initialTopMostItemIndex={scrollPosition}
                    />
                </div>
            </div>
        </DynamicModuleLoader>
    );
};

export default ArticlesListPage;
