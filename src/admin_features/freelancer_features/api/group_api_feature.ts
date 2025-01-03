import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';
const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export type GroupFormType = {
  id?: number;
  name: string;
  company_id: number;
  details: string;
  worker: { employee_id: number }[];
  session: { session_id: number }[];
};

export const usePostGroup = () => {
  return useMutation({
    mutationFn: async (data: GroupFormType) => {
      try {
        const res = await axios.post(`${BaseURL}/group-session`, data);
        console.log('url :', res);
        return res.data;
      } catch (e) {
        return e;
      }
    },
  });
};

export const useUpdateGroup = () => {
  return useMutation({
    mutationFn: async (data: GroupFormType) => {
      try {
        const res = await axios.put(`${BaseURL}/group-session/${data.id}`, data);
        return res.data;
      } catch (e) {
        return e;
      }
    },
  });
};

export const useGetGroup = (company_id: number) => {
  return useQuery({
    queryKey: ['group', company_id],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BaseURL}/group?company=${company_id}`, {
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

export const useDeleteGroup = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await axios.delete(`${BaseURL}/group/${id}`);
      return res.data;
    },
  });
};
