import { QueryClient } from '@tanstack/react-query';

// Singleton QueryClient mirroring hamari-ai-monorepo pattern
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchInterval: false,
    },
  },
});
