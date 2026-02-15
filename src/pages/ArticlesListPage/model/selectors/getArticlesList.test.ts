import { getArticlesListSort } from './getArticlesListSort';
import { getArticlesListSearchKey } from './getArticlesSearchKey';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { getArticlesListIsLoading } from './getAriclesListIsLoading';
import { getArticlesListLastPage } from './getArticlesListLastPage';
import { getArticlesListPageInited } from './getArticlesListPageInited';
import { getArticlesListView } from './getArticlesListView';
import { getArticlesListPage } from './getArticlesListPage';

describe('getArticlesList.test', () => {
    it('should return selectors result', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                isLoading: true,
                error: 'error',
                totalCount: 1,
                view: 'grid',
                currentPage: 1,
                lastPage: false,
                _inited: true,
                ids: ['1', '2'],
                sort: 'latest',
                searchKey: 'test',
                entities: {
                    '1': {
                        id: '1',
                        title: 'title',
                    },
                    '2': {
                        id: '2',
                        title: 'title2',
                    },
                },
            },
        };

        expect(getArticlesListIsLoading(state as StateSchema)).toBe(true);
        expect(getArticlesListLastPage(state as StateSchema)).toBe(false);
        expect(getArticlesListPageInited(state as StateSchema)).toBe(true);
        expect(getArticlesListView(state as StateSchema)).toBe('grid');
        expect(getArticlesListSort(state as StateSchema)).toBe('latest');
        expect(getArticlesListSearchKey(state as StateSchema)).toBe('test');
        expect(getArticlesListPage(state as StateSchema)).toBe(1);
    });
});
