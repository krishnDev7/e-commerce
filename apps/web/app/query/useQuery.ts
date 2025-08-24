import { useQuery as useRQQuery, UseQueryResult } from '@tanstack/react-query';
import { APIClientQueryBuilder } from '@ecommerce/api-client';
import { buildClientQueryBuilder } from './client-query-builder';

export const useQuery = <E, R>(
  props: APIClientQueryBuilder<E, R>,
  params?: E,
): UseQueryResult<R, Error> => {
  return useRQQuery<R, Error>(buildClientQueryBuilder(props, params));
};
