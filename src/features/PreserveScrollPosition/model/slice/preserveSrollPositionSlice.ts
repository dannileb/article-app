import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PreserveSrollPositionSchema } from '../types/preserveSrollPosition';

const initialState: PreserveSrollPositionSchema = {
    scrollPositionStore: {},
};

export const preserveSrollPositionSlice = createSlice({
    name: 'preserveSrollPosition',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            action: PayloadAction<{ key: string; value: number }>,
        ) => {
            state.scrollPositionStore[action.payload.key] =
                action.payload.value;
        },
    },
});

export const {
    actions: preserveSrollPositionActions,
    reducer: preserveSrollPositionReducer,
} = preserveSrollPositionSlice;
