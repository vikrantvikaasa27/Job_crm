const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export const getCompaniesAPI = async (query: string = '') => {
  const request = await fetch(`${BASE_URL}/api/companies?${query}`);
  const response = await request.json();

  return response;
};

export const getIndustriesAPI = async () => {
  const request = await fetch(`${BASE_URL}/api/companies/industries`);
  const response = await request.json();

  return response;
};
