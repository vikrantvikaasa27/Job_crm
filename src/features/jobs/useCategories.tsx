'use client';

import { BASE_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useCategories = (placeholderData: object = { data: [] }) => {
  const { data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const request = await fetch(`${BASE_URL}/api/jobs/categories`);
      const response = await request.json();

      return response;
    },
    staleTime: Infinity,
    placeholderData,
  });

  return {
    data,
    isFetching,
  };
};

export default useCategories;
