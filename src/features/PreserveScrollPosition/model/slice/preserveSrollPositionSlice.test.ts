import {
    preserveSrollPositionActions,
    preserveSrollPositionReducer,
} from './preserveSrollPositionSlice';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { PreserveSrollPositionSchema } from '../types/preserveSrollPosition';

describe('preserveSrollPositionSlice.test', () => {
    it('should update scroll position by key', () => {
        const state: DeepPartial<PreserveSrollPositionSchema> = {
            scrollPositionStore: {
                key1: 0,
            },
        };

        expect(
            preserveSrollPositionReducer(
                state as PreserveSrollPositionSchema,
                preserveSrollPositionActions.setScrollPosition({
                    key: 'key1',
                    value: 10,
                }),
            ),
        ).toEqual({
            scrollPositionStore: {
                key1: 10,
            },
        });
    });
});
