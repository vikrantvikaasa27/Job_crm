'use client';

import { BASE_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const useJobs = (placeholderData: object = { data: [] }) => {
  const searchParams = useSearchParams().toString() || 'role=&location=';

  const { data, isFetching } = useQuery({
    queryKey: ['jobs', searchParams],
    queryFn: async () => {
      const request = await fetch(`${BASE_URL}/api/jobs?${searchParams}`);
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

export default useJobs;
