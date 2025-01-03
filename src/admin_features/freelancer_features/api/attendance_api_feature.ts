// API FOR SESSION
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';
const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useGetAttendanceWorker = (
  company_id?: number,
  group_id?: number,
  date?: string,
  name?: string
) => {
  return useQuery({
    queryKey: ['worker_attendance', company_id, group_id, date, name],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (date) params.append('date', date);
      if (name) params.append('employee_id', name.toString());
      if (group_id) params.append('group', group_id.toString());
      if (company_id) params.append('company_id', company_id.toString());

      const res = await axios.get(`${BaseURL}/worker-attendance?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
      });
      console.log(`ini url hadie = ${BaseURL}/worker-attendance?${params.toString()}`);
      console.log(`ini url name = ${name}`);
      return res.data.data;
    },
  });
};

export const useGetReport = () => {
  return useMutation({
    mutationFn: async (group_id: string) => {
      const res = await axios.get(`${BaseURL}/generate-worker-report?group=${group_id}`, {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
      });
      return res.data;
    },
  });
};
