import { ArticlesListSchema } from '../types/articlesList.types';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import {
    articlesListActions,
    articlesListReducer,
} from '#/pages/ArticlesListPage/model/slices/articlesPageSlice';
import { ARTICLES_LIST_VIEW_KEY } from '#/shared/consts/localStorage';

describe('articlesPageSlice.test', () => {
    it('should toggle view', () => {
        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
        const state: DeepPartial<ArticlesListSchema> = {
            view: 'grid',
        };
        const newState = articlesListReducer(
            state as ArticlesListSchema,
            articlesListActions.toggleView(),
        );
        expect(newState).toEqual({
            view: 'list',
        });
        expect(
            articlesListReducer(
                newState as ArticlesListSchema,
                articlesListActions.toggleView(),
            ),
        ).toEqual({
            view: 'grid',
        });
        expect(setItemSpy).toHaveBeenCalledWith(ARTICLES_LIST_VIEW_KEY, 'list');
        expect(setItemSpy).toHaveBeenCalledWith(ARTICLES_LIST_VIEW_KEY, 'grid');
        expect(setItemSpy).toHaveBeenCalledTimes(2);

        setItemSpy.mockRestore();
    });
    it('should init state', () => {
        const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
        getItemSpy.mockReturnValue('list');

        const state: DeepPartial<ArticlesListSchema> = {};

        const newState = articlesListReducer(
            state as ArticlesListSchema,
            articlesListActions.initState({
                searchKey: 'test',
                sort: 'latest',
            }),
        );
        expect(newState).toEqual({
            view: 'list',
            searchKey: 'test',
            sort: 'latest',
            _inited: true,
        });
        expect(getItemSpy).toHaveBeenCalledWith(ARTICLES_LIST_VIEW_KEY);
    });
    it('should add current page', () => {
        const state: DeepPartial<ArticlesListSchema> = {
            currentPage: 1,
        };
        const newState = articlesListReducer(
            state as ArticlesListSchema,
            articlesListActions.addCurrentPage(),
        );
        expect(newState).toEqual({
            currentPage: 2,
        });
    });

    it('should reset current page', () => {
        const state: DeepPartial<ArticlesListSchema> = {
            currentPage: 1,
        };
        expect(
            articlesListReducer(
                state as ArticlesListSchema,
                articlesListActions.resetCurrentPage(),
            ),
        ).toEqual({
            currentPage: 1,
        });
    });

    it('should update search key', () => {
        const state: DeepPartial<ArticlesListSchema> = {
            searchKey: '',
        };
        expect(
            articlesListReducer(
                state as ArticlesListSchema,
                articlesListActions.setSearchKey('test'),
            ),
        ).toEqual({
            searchKey: 'test',
        });
    });

    it('should update sort', () => {
        const state: DeepPartial<ArticlesListSchema> = {
            sort: 'default',
        };
        expect(
            articlesListReducer(
                state as ArticlesListSchema,
                articlesListActions.setSortParams('latest'),
            ),
        ).toEqual({
            sort: 'latest',
        });
    });
});
