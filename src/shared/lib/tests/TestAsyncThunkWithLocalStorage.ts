import { TestAsyncThunk } from '#/shared/lib/tests/TestAsyncThunk';
import { AsyncThunkAction } from '@reduxjs/toolkit';

type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

export class TestAsyncThunkWithLocalStorage<
    Return,
    Arg,
    RejectedValue,
> extends TestAsyncThunk<Return, Arg, RejectedValue> {
    store: Record<string, string>;
    localStorageMock;

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
        super(actionCreator);

        this.store = {};

        this.localStorageMock = {
            getItem: jest.fn((key: string) => {
                return this.store[key] || null;
            }),
            setItem: jest.fn((key: string, value: string) => {
                this.store[key] = value.toString();
            }),
            clear: jest.fn(() => {
                this.store = {};
            }),
            removeItem: jest.fn((key: string) => {
                delete this.store[key];
            }),
        };

        Object.defineProperty(window, 'localStorage', {
            value: this.localStorageMock,
            writable: true,
        });
    }

    clearLocalStorage() {
        this.store = {};
        jest.clearAllMocks();
    }
}
