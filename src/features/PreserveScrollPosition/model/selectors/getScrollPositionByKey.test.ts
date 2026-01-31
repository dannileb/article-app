import { getScrollPositionByKey } from './getScrollPositionByKey';
import { DeepPartial } from '#/shared/types/DeepPartial.types';

describe('getScrollPositionByKey.test', () => {
    it('should return scroll position by key', () => {
        const state: DeepPartial<StateSchema> = {
            preserveScrollPosition: {
                scrollPositionStore: {
                    key1: 10,
                },
            },
        };
        expect(getScrollPositionByKey(state, 'key1')).toBe(10);
    });
    it('should return undefined if key not found', () => {
        const state: DeepPartial<StateSchema> = {
            preserveScrollPosition: {
                scrollPositionStore: {
                    key1: 10,
                },
            },
        };
        expect(getScrollPositionByKey(state, 'key2')).toBe(undefined);
    });
});
