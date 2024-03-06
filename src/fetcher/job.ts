const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export const getJobsAPI = async (query: string = '') => {
  const request = await fetch(`${BASE_URL}/api/jobs?${query}`);
  const response = await request.json();

  return response;
};

export const getCategoriesAPI = async () => {
  const request = await fetch(`${BASE_URL}/api/jobs/categories`);
  const response = await request.json();

  return response;
};
