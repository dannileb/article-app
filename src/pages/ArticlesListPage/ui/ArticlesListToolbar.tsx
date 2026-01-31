import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { Toggle } from '#/shared/ui/Toggle/Toggle';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { getArticlesListView } from '../model/selectors/getArticlesListView';
import classes from './ArticlesListToolbar.module.scss';
import { articlesListPageSlice } from '../model/slices/articlesPageSlice';
import { useCallback } from 'react';

const VIEW_TOGGLE_ITEMS = [
    { key: 'grid', icon: <AppstoreOutlined /> },
    { key: 'list', icon: <UnorderedListOutlined /> },
];

export const ArticlesListToolbar = () => {
    const dispatch = useAppDispatch();
    const view = useAppSelector(getArticlesListView) ?? 'grid';

    const handleToggleView = useCallback(() => {
        dispatch(articlesListPageSlice.actions.toggleView());
    }, [dispatch]);

    return (
        <div className={classes.toolbar}>
            <Toggle
                items={VIEW_TOGGLE_ITEMS}
                toggledKey={view}
                onToggle={handleToggleView}
            />
        </div>
    );
};
