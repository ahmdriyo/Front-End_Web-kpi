import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type AttendanceDataPost = {
  schedule_id?: number;
  employee_id?: number | null;
  attendance_lat: string;
  attendance_lon: string;
  attendance_location_id?: number | null;
  company_id?: number;
};

export const postCreateAttendance = async (attendanceDataPost: AttendanceDataPost) => {
  const response = await axios.post(`${BaseURL}/attendance/in`, attendanceDataPost);
  return response.data;
};

export const useCreateAttendance = () => {
  return useMutation({
    mutationFn: postCreateAttendance,
    onMutate: async (attendanceDataPost: AttendanceDataPost) => {
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
