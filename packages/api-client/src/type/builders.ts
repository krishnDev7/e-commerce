type APIClientModule = 'product';

interface APIClientBase {
  cacheKey: (string | number)[];
  module: APIClientModule;
  options?: {
    enabled?: boolean | ((props: any) => boolean);
    refetchInterval?: number | false;
    refetchIntervalInBackground?: boolean;
    retry?: number;
    keepPreviousData?: boolean;
    refetchOnWindowFocus?: boolean;
  };
}

export interface APIClientQueryBuilder<E, R> extends APIClientBase {
  resolver: (props: E) => Promise<R>;
}

export interface APIClientMutationBuilder<E, R> extends APIClientBase {
  resolver: (props: E) => Promise<R>;
}
