import { $api } from '#/shared/api/api';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('#/shared/api/api');

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.Mock;
    getState: () => StateSchema;
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;
    api: jest.Mocked<AxiosInstance>;
    navigate: jest.Mock;

    constructor(
        actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
        state?: DeepPartial<StateSchema>,
    ) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state as StateSchema);

        this.api = jest.mocked($api);

        this.navigate = jest.fn();
    }

    async callThunk(arg: Arg) {
        const thunk = this.actionCreator(arg);
        const result = await thunk(this.dispatch, this.getState, {
            api: this.api,
            navigate: this.navigate,
        });
        return result;
    }
}
