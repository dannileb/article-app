import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = Partial<{ [key in keyof StateSchema]: Reducer }>;
