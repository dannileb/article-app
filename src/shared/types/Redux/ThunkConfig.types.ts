import { ResponseError } from '#/shared/types/Axios';
import { AxiosInstance } from 'axios';
import { NavigateFunction } from 'react-router';

interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: NavigateFunction;
}

export interface ThunkConfig<Error = ResponseError> {
    state: StateSchema;
    rejectValue: Error;
    extra: ThunkExtraArg;
}
