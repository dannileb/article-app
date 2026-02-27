export type RtkqMock<A> = A extends {
    util: { upsertQueryData: (...args: infer Params) => unknown };
}
    ? {
          api: A;
          endpoint: Params[0];
          args: Params[1];
          data: Params[2];
      }
    : never;
