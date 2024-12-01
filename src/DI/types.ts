export type InjectionToken<T> =
  | Symbol
  | string
  | {
      new (...args: any[]): T;
    };

export type Provider<T = unknown> = {
  useClass?: T;
  useValue?: T;
  useFactory?: (...args: any[]) => T;
};

export type ProviderRegistration<T = unknown> = {
  token: InjectionToken<T>;
  provider: Provider;
};
