import { EmployeeType } from '@/admin_features/types';

export type AttendanceRequestType = {
  id: number;
  date: Date;
  reason: string;
  status: string;
  employee_id: number;
  employee: EmployeeType;
  attendance_request_lat: string;
  attendance_request_lon: string;
};
