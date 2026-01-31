import { createSelector } from '@reduxjs/toolkit';

const getScrollPosition = (state: StateSchema) => state.preserveScrollPosition;

export const getScrollPositionByKey = createSelector(
    getScrollPosition,
    (_, key: string) => key,
    (scrollStore, key) => scrollStore.scrollPositionStore[key],
);
