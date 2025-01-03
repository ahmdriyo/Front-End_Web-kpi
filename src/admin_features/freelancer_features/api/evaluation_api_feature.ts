import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';

const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export type EvaluationFormType = {
  name: string;
  company_id: number;
  session: { session_id: number }[];
  group: { group_id: number }[];
  worker: { employee_id: number }[];
};

export const usePostEvaluation = () => {
  return useMutation({
    mutationFn: async (data: EvaluationFormType) => {
      try {
        const res = await axios.post(`${BaseURL}/evaluations`, data);
        console.log('url eva :', res);
        return res.data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  });
};
export const useGetEvaluations = (company_id: number) => {
  return useQuery({
    queryKey: ['evaluations', company_id],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BaseURL}/evaluations?company=${company_id}`, {
          headers: {
            Authorization: `Bearer ${storage.getToken()}`,
          },
        });
        return res.data;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
  });
};
