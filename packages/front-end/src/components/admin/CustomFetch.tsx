import { Options } from 'react-admin';

export const CustomFetch = async (url: any, options: Options | undefined) => {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
    ...options?.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 401 status code here
  if (response.status === 401) {
    localStorage.removeItem('access_token');
    throw new Error('Unauthorized');
  }

  const body = await response.text();
  const json = body.length ? JSON.parse(body) : {};

  return {
    status: response.status,
    headers: response.headers,
    ok: response.ok,
    body,
    json,
  };
};

export default CustomFetch;
