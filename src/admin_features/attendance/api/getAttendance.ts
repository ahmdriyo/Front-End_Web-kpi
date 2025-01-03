/* eslint-disable linebreak-style */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getAttendance(date: string, company_id?: number) {
  const res = await axios.get(`${BaseURL}/schedule?&company=${company_id}&date=${date}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export async function getAttendanceRecap(date: string, company_id?: number) {
  const res = await axios.get(`${BaseURL}/schedule?&company=${company_id}&date=${date}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });

  let Hadir = 0;
  let BelumHadir = 0;
  let Cuti = 0;
  let Sakit = 0;
  let Terlambat = 0;
  let Izin = 0;
  const Overall = res.data.data.length;

  res.data.data.forEach((item: any) => {
    if (item.Attendance.length < 1) BelumHadir++;
    if (item.Attendance.length != 0) Hadir++;
    if (item.Attendance.length > 0 && item.Attendance[0].status == 'late') Terlambat++;
    if (item.attendance_status == 'Cuti' || item.attendance_status == 'cuti') Cuti++;
    if (item.attendance_status == 'Sakit' || item.attendance_status == 'sakit') Sakit++;
    if (item.attendance_status == 'Izin' || item.attendance_status == 'izin') Izin++;
  });

  return {
    Hadir,
    BelumHadir,
    Cuti,
    Terlambat,
    Sakit,
    Izin,
    Overall,
  };
}

export const useGetAttendance = (date: string, company_id?: number) => {
  return useQuery({
    queryKey: ['attendance', date, company_id],
    queryFn: () => getAttendance(date, company_id),
  });
};

export const useGetAttendanceRecap = (date: string, company_id?: number) => {
  return useQuery({
    queryKey: ['attendance_recap', date, company_id],
    queryFn: () => getAttendanceRecap(date, company_id),
  });
};

export async function getAttendanceRecapByDivision(date: string, division_id?: number) {
  const res = await axios.get(`${BaseURL}/schedule?&division=${division_id}&date=${date}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });

  let Hadir = 0;
  let BelumHadir = 0;
  let Cuti = 0;
  let Sakit = 0;
  let Terlambat = 0;
  let Izin = 0;
  const Overall = res.data.data.length;

  res.data.data.forEach((item: any) => {
    if (item.Attendance.length < 1) BelumHadir++;
    if (item.Attendance.length != 0) Hadir++;
    if (item.Attendance.length > 0 && item.Attendance[0].status == 'late') Terlambat++;
    if (item.attendance_status == 'Cuti' || item.attendance_status == 'cuti') Cuti++;
    if (item.attendance_status == 'Sakit' || item.attendance_status == 'sakit') Sakit++;
    if (item.attendance_status == 'Izin' || item.attendance_status == 'izin') Izin++;
  });

  return {
    Hadir,
    BelumHadir,
    Cuti,
    Terlambat,
    Sakit,
    Izin,
    Overall,
  };
}

export const useGetAttendanceRecapByDivision = (date: string, division_id?: number) => {
  return useQuery({
    queryKey: ['attendance_recap', date, division_id],
    queryFn: () => getAttendanceRecapByDivision(date, division_id),
  });
};
