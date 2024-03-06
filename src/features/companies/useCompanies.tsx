'use client';

import { BASE_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const useCompanies = (placeholderData: object = { data: [] }) => {
  const searchParams = useSearchParams().toString() || 'name=&location=';

  const { data, isFetching } = useQuery({
    queryKey: ['companies', searchParams],
    queryFn: async () => {
      const request = await fetch(`${BASE_URL}/api/companies?${searchParams}`);
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

export default useCompanies;
