import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function getAttendance(employee_id: number, month: number, year: number) {
  const res = await axios.get(
    `${BaseURL}/schedule?employee=${employee_id}&month=${month}&year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );

  if (res.status !== 200) {
    throw new Error('Failed to fetch data');
  }
  return res.data.data;
}

async function getRecap(company_id?: number, month?: number, year?: number, division_id?: number) {
  let url = `${BaseURL}/employee`;
  if (company_id) url += `?company=${company_id}`;
  if (division_id) url += `&division=${division_id}`;
  url += `&is-not-freelanced=true`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });

  if (res.status !== 200) {
    throw new Error('Failed to fetch data');
  }

  const DataAttendance: any[] = res.data.data;

  const attendancePromises = DataAttendance.map(async (employee: any, index: number) => {
    // Await the asynchronous getAttendance call
    const recap = await getAttendance(
      employee.id,
      month ?? new Date().getMonth() + 1,
      year ?? new Date().getFullYear()
    );
    DataAttendance[index].recap = recap;
  });

  // Wait for all the promises to resolve
  await Promise.all(attendancePromises);

  return DataAttendance;
}

export const useGetRecap = (
  company_id?: number,
  month?: number,
  year?: number,
  division_id?: number
) => {
  return useQuery({
    queryKey: ['recap', company_id, division_id, month, year],
    queryFn: () => getRecap(company_id, month, year, division_id),
  });
};
