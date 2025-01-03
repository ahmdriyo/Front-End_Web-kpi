import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';
const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getOvertime(company?: number, month?: number, year?: number) {
  const URL = `${BaseURL}/overtime?company=${company}`;

  const res = await axios.get(`${URL}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data;
}

export const useGetOvertime = (company?: number, month?: number, year?: number) => {
  return useQuery({
    queryKey: ['overtime', company, month, year],
    queryFn: () => getOvertime(company, month, year),
  });
};
