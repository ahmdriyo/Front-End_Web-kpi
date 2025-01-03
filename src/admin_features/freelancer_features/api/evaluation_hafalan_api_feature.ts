import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// import { EvaluationQuranType } from '@/admin_features/types';
// import { WorkerAttendanceType } from '@/features/attendance';

import storage from '@/utils/storage';

const BaseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/api';
export const addEvaluationQuran = async (data: {
  ayat: string;
  type: string;
  nama_surah: string;
  status: string;
  worker_attendance_id: number;
}) => {
  try {
    const response = await axios.post(`${BaseURL}/evaluation-quran`, data, {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    });
    return response.data; // Mengembalikan respons dari backend (data baru yang ditambahkan)
  } catch (error: any) {
    console.error(
      'Gagal menambahkan data evaluation_quran:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateWorkerAttendance = async (id: number, data: { evaluation_quran_id: number }) => {
  try {
    const response = await axios.put(`${BaseURL}/evaluation-quran/${id}`, data, {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Gagal memperbarui worker_attendance:', error.response?.data || error.message);
    throw error;
  }
};
export const useGetEvaluationQuran = (company_id?: number, group_id?: number, date?: string) => {
  return useQuery({
    queryKey: ['evaluation_quran', company_id, group_id, date],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (date) params.append('date', date);
      if (company_id) params.append('company_id', company_id.toString());
      if (group_id) params.append('group', group_id.toString());
      const res = await axios.get(`${BaseURL}/evaluation-quran?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
      });
      console.log(`${BaseURL}/evaluation-quran${params.toString()}`);
      return res.data.data;
    },
  });
};
