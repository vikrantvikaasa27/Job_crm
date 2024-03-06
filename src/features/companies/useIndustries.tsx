'use client';

import { BASE_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useIndustries = (placeholderData: object = { data: [] }) => {
  const { data, isFetching } = useQuery({
    queryKey: ['industries'],
    queryFn: async () => {
      const request = await fetch(`${BASE_URL}/api/companies/industries`);
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

export default useIndustries;
