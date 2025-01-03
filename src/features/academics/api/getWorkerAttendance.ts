import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';
const BaseURL = import.meta.env.VITE_API_URL;

export async function getWorkerAttendanceByGroup(
  date: Date | string,
  group_id: number | undefined,
  session_id: string | undefined
) {
  const res = await axios.get(
    `${BaseURL}/worker-attendance?date=${date}&session=${session_id}&group=${group_id}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  console.log(`${BaseURL}/worker-attendance?date=${date}&session=${session_id}&group=${group_id}`);

  return res.data.data;
}

export const useGetWorkerAttendanceByGroup = (
  date: Date | string,
  group_id: number | undefined,
  session_id: string | undefined
) => {
  return useQuery({
    queryKey: ['worker-attendance', date, group_id, session_id],
    queryFn: () => getWorkerAttendanceByGroup(date, group_id, session_id),
  });
};
