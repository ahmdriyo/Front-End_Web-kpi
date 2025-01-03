import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';

const BaseURL = import.meta.env.VITE_API_URL;

type EvaluationQuranDataPost = {
  employee_input_id?: number | null;
  student: any;
};

export const postCreateEvaluationQuran = async (evaluationDataPost: EvaluationQuranDataPost) => {
  const response = await axios.post(`${BaseURL}/evaluation-quran`, evaluationDataPost);
  return response.data;
};

export const useCreateEvaluationQuran = () => {
  return useMutation({
    mutationFn: postCreateEvaluationQuran,
    // onSuccess: (...args) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['evaluation_quran'],
    //   });
    // },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
