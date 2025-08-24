import { QueryFunctionContext, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { APIClientQueryBuilder } from '@ecommerce/api-client';

export const buildClientQueryBuilder = <E, R>(
  config: APIClientQueryBuilder<E, R>,
  params?: E,
): UseQueryOptions<R, Error, R, QueryKey> => {
  return {
    queryKey: [...config.cacheKey, params],
    queryFn: () => config.resolver(params as E),
    enabled: config.options?.enabled ?? true,
    refetchInterval:
      config.options?.refetchInterval === false ? false : config.options?.refetchInterval,
    refetchIntervalInBackground: config.options?.refetchIntervalInBackground ?? false,
    retry: config.options?.retry ?? 3,
  };
};
