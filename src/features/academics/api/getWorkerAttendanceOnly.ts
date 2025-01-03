import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';
const BaseURL = import.meta.env.VITE_API_URL;

export async function getWorkerAttendanceOnly(date: Date | string) {
  const res = await axios.get(`${BaseURL}/worker-attendance?date=${date}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  console.log(`${BaseURL}/worker-attendance?date=${date}`);

  return res.data.data;
}

export const useGetWorkerAttendanceOnly = (date: Date | string) => {
  return useQuery({
    queryKey: ['worker-attendance', date],
    queryFn: () => getWorkerAttendanceOnly(date),
  });
};
