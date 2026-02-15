import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { Toggle } from '#/shared/ui/Toggle/Toggle';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { getArticlesListView } from '../model/selectors/getArticlesListView';
import classes from './ArticlesListToolbar.module.scss';
import { articlesListPageSlice } from '../model/slices/articlesPageSlice';
import { useCallback, useEffect, useMemo } from 'react';
import { Select } from '#/shared/ui/Select/Select';
import { Input } from '#/shared/ui/Input/Input';
import { ArticleSortValue } from '../model/types/articlesList.types';
import { getArticlesListSort } from '../model/selectors/getArticlesListSort';
import { getArticlesListSearchKey } from '../model/selectors/getArticlesSearchKey';
import { useDebounce } from '#/shared/lib/hooks/useDebounce';
import { fetchNextArticlesListPage } from '../model/services/fetchNextArticlesListPage/fetchNextArticlesListPage';
import { useSearchParams } from 'react-router';
import { SEARCH_URL_PARAM_KEY, SORT_URL_PARAM_KEY } from '../lib/constants';
import { useTranslation } from 'react-i18next';

const VIEW_TOGGLE_ITEMS = [
    { key: 'grid', icon: <AppstoreOutlined /> },
    { key: 'list', icon: <UnorderedListOutlined /> },
];

export const ArticlesListToolbar = () => {
    const { t } = useTranslation('articlesList');
    const dispatch = useAppDispatch();
    const view = useAppSelector(getArticlesListView) ?? 'grid';
    const sort = useAppSelector(getArticlesListSort);
    const searchKey = useAppSelector(getArticlesListSearchKey);
    const [, setSearchParams] = useSearchParams();

    const sortItems = useMemo<{ label: string; value: ArticleSortValue }[]>(
        () => [
            { label: t('defalut'), value: 'default' },
            { label: t('popular'), value: 'popular' },
            { label: t('latest'), value: 'latest' },
            { label: t('oldest'), value: 'oldest' },
        ],
        [t],
    );

    const fetchData = useCallback(() => {
        dispatch(fetchNextArticlesListPage({ replace: true }));
    }, [dispatch]);

    const fetchDataDebounced = useDebounce(fetchData, 200);

    const handleToggleView = useCallback(() => {
        dispatch(articlesListPageSlice.actions.toggleView());
    }, [dispatch]);

    const handleChangeSort = useCallback(
        (v: { label: string; value: ArticleSortValue }) => {
            dispatch(articlesListPageSlice.actions.setSortParams(v.value));
            dispatch(articlesListPageSlice.actions.resetCurrentPage());
            fetchDataDebounced();
        },
        [dispatch, fetchDataDebounced],
    );

    const handleChangeSearchKey = useCallback(
        (v: string) => {
            dispatch(articlesListPageSlice.actions.setSearchKey(v));
            dispatch(articlesListPageSlice.actions.resetCurrentPage());
            fetchDataDebounced();
        },
        [dispatch, fetchDataDebounced],
    );

    const updateSearchParams = useCallback(
        (sort: string, searchKey: string) => {
            setSearchParams((searchParams) => {
                searchParams.set(SORT_URL_PARAM_KEY, sort);
                searchParams.set(SEARCH_URL_PARAM_KEY, searchKey);
                return searchParams;
            });
        },
        [setSearchParams],
    );

    const updateSearchParamsDebounced = useDebounce(updateSearchParams, 200);

    useEffect(() => {
        updateSearchParamsDebounced(sort, searchKey);
    }, [sort, searchKey, updateSearchParamsDebounced]);

    return (
        <div className={classes.toolbar}>
            <Input
                value={searchKey}
                placeholder={t('searchKey_placeholder')}
                className={classes.searchInput}
                onChange={handleChangeSearchKey}
            />
            <Select
                items={sortItems}
                value={sortItems.find((item) => item.value === sort)}
                onChange={handleChangeSort}
            />
            <Toggle
                items={VIEW_TOGGLE_ITEMS}
                toggledKey={view}
                onToggle={handleToggleView}
            />
        </div>
    );
};
