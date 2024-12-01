import { container } from "tsyringe";
import type TsyringeTypes from "tsyringe";
import type { InjectionToken, ProviderRegistration } from "./types";

/**
 *  wrapper to resolve dependency from DI container
 * @param token
 * @returns  resolved dependency from the DI container
 */
export function resolveDependency<T>(token: InjectionToken<T>): T {
  return container.resolve<T>(token as TsyringeTypes.InjectionToken<T>);
}

/**
 *  wrapper to register dependency in DI container
 * @param token  InjectionToken<T> injection token to register dependency in DI container
 * @param provider Provider<T> provider to register dependency in DI container
 */
export function registerDependency<T>({
  token,
  provider,
}: ProviderRegistration): void {
  if (provider.useClass) {
    container.register(
      token as TsyringeTypes.InjectionToken<T>,
      provider as TsyringeTypes.ClassProvider<T>
    );
  } else if (provider.useFactory) {
    container.register(
      token as TsyringeTypes.InjectionToken<T>,
      provider as TsyringeTypes.FactoryProvider<T>
    );
  } else {
    container.register(
      token as TsyringeTypes.InjectionToken<T>,
      provider as TsyringeTypes.ValueProvider<T>
    );
  }
}
