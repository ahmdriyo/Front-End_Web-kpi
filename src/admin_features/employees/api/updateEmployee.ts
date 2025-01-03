import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
type EmployeePostType = {
  id?: number;
  nip: string;
  nik: string;
  no_bpjs: string;
  name: string;
  sex: string;
  birth_date: string;
  religion: string;
  address: string;
  rt: string;
  rw: string;
  village: string;
  subdistrict: string;
  district: string;
  province: string;
  postal_code: string;
  phone: string;
  status: boolean;
  username: string;
  password: string;
  role: string;
  division_id: number;
  user_id?: number;
  company_id?: number;
};

type UserPostType = {
  id?: number;
  username: string;
  password: string;
  role: string;
  status: boolean;
  company_id?: number;
};

export async function updateUser(user: UserPostType) {
  const response = await axios.get(`${BaseURL}/user/${user.id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });

  if (!response.data) {
    const res = await axios.post(`${BaseURL}/user`, user);
    return res.data.data;
  }

  const res = await axios.put(`${BaseURL}/user/${user.id}`, user);
  return res.data.data;
}

const UpdateEmployee = async (employee: EmployeePostType & UserPostType) => {
  const CreateUser = {
    id: employee.user_id,
    username: employee.username,
    password: employee.password,
    role: employee.role,
    status: employee.status,
    company_id: employee.company_id,
  };

  const resultUser = await updateUser(CreateUser);

  if (!resultUser) throw new Error('Failed to create user');
  const UpdateEmployee = {
    ...employee,
    user_id: resultUser.id,
  };

  const res = await axios.put(`${BaseURL}/employee/${employee.id}`, UpdateEmployee);
  return res.data;
};

export const useUpdateEmployee = () => {
  return useMutation({
    mutationFn: UpdateEmployee,
  });
};
