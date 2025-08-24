'use client';
import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createTheme } from '@ecommerce/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';

export function Providers({ children }: { children: ReactNode }) {
  const theme = createTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </QueryClientProvider>
  );
}
