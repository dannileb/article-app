export type PartialWithoutUndefined<T> = {
    [P in keyof T]?: T[P];
};
