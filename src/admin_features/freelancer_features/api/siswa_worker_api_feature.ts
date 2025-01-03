import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';
const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useGetWorkersSiswa = (
  company_id: number,
  status: number = 2,
  not_assigned: boolean = false
) => {
  return useQuery({
    queryKey: ['workers', company_id],
    queryFn: async () => {
      try {
        if (not_assigned) {
          const res = await axios.get(
            `${BaseURL}/worker?status=${status}&company=${company_id}&not-assigned=true`,
            {
              headers: {
                Authorization: `Bearer ${storage.getToken()}`,
              },
            }
          );

          return res.data.data;
        }
        const res = await axios.get(`${BaseURL}/worker?status=${status}&company=${company_id}`, {
          headers: {
            Authorization: `Bearer ${storage.getToken()}`,
          },
        });
        return res.data.data;
      } catch (e) {
        return [];
      }
    },
  });
};
