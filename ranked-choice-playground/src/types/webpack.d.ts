declare namespace __WebpackModuleApi {
  interface RequireContext {
    (id: string): any;
    keys(): string[];
    resolve(id: string): string;
  }
}

declare var require: {
  context: (
    path: string,
    deep?: boolean,
    filter?: RegExp
  ) => __WebpackModuleApi.RequireContext;
};
