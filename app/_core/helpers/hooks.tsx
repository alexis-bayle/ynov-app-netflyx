import { QueryClient } from '@tanstack/react-query';

const oneDay = 1000 * 60 * 60 * 24;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: oneDay, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
