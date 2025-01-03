import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function deleteWorker(id: number) {
  const res = await axios.put(`${BaseURL}/worker/${id}`, {
    status: 3, // 3 is deleted status
  });
  return res.data;
}

export const useDeleteWorker = () => {
  return useMutation({
    mutationFn: (id: number) => deleteWorker(id),
    onError: () => {},
  });
};
