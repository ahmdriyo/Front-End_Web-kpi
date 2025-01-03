import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';
const BaseURL = import.meta.env.VITE_API_URL;

export async function getEvaluationQuranByGroupSession(
  date: Date | string,
  group_id: number | undefined,
  session_id: string | undefined
) {
  const res = await axios.get(
    `${BaseURL}/evaluation-quran?date=${date}&session=${session_id}&group=${group_id}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  console.log(`${BaseURL}/evaluation-quran?date=${date}&session=${session_id}&group=${group_id}`);

  return res.data.data;
}

export const useGetEvaluationQuranByGroupSession = (
  date: Date | string,
  group_id: number | undefined,
  session_id: string | undefined
) => {
  return useQuery({
    queryKey: ['evaluation-quran', date, group_id, session_id],
    queryFn: () => getEvaluationQuranByGroupSession(date, group_id, session_id),
  });
};
