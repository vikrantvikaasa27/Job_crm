const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export const jobseekerApplyAPI = async (data: object) => {
  const request = await fetch(`${BASE_URL}/api/profile/jobseeker/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const response = await request.json();

  return response;
};

export const postJobCompanyAPI = async (data: object) => {
  const request = await fetch(`${BASE_URL}/api/profile/company/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const response = await request.json();

  return response;
};

export const updateCompanyOverviewAPI = async (data: object) => {
  const request = await fetch(`${BASE_URL}/api/profile/company`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const response = await request.json();

  return response;
};

export const createLinkAPI = async (data: object) => {
  const request = await fetch(`${BASE_URL}/api/profile/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const response = await request.json();

  return response;
};

export const deleteLinkAPI = async (linkId: string) => {
  const request = await fetch(`${BASE_URL}/api/profile/links/${linkId}`, {
    method: 'DELETE',
  });
  const response = await request.json();

  return response;
};

export const updateAccountAPI = async (data: object) => {
  const request = await fetch(`${BASE_URL}/api/profile/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const response = await request.json();

  return response;
};
