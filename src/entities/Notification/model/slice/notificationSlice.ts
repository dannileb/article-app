import { NotificationSchema } from '../../model/types/Notification.types';
import { LAST_SEEN_NOTIF_KEY } from '#/shared/consts/localStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: NotificationSchema = {
    lastSeen: Number(localStorage.getItem(LAST_SEEN_NOTIF_KEY)) || 0,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        markAsSeen(state, action: PayloadAction<number>) {
            state.lastSeen = action.payload;
            localStorage.setItem(LAST_SEEN_NOTIF_KEY, String(action.payload));
        },
    },
});

export const { actions: notificationActions, reducer: notificationReducer } =
    notificationSlice;
