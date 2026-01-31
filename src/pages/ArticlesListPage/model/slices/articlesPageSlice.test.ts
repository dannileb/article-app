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
            articlesListActions.initState(),
        );
        expect(newState).toEqual({
            view: 'list',
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
});
