import { EmployeeGroupsType, EmployeeType, ShiftType } from '@/admin_features/types';

export type SessionGroupType = {
  id: number;
  session_id: number;
  session: SessionType;
  group_id: number;
  group: GroupType;
};
export type GroupType = {
  id: number;
  name: string;
  company_id: number;
  EmployeeGroups: EmployeeType[];
  GroupSessions: SessionGroupType[];
};

export type SessionType = {
  id: number;
  name: string;
  company_id: number;
};

export type WorkerAttendanceType = {
  length: number;
  id: number;
  date: Date | string;
  attendance_status: string;
  detail: string;
  group_name: string;
  session_name: string;
  employee_input_id: number;
  employee_id: number;
  employee: EmployeeType;
  employee_group_id: number;
  employee_group: EmployeeGroupsType;
  group_session_id: number;
  group_session: SessionGroupType;
};

export type QuranSurah = {
  id: number;
  surah_name: string;
  surah_ayat: number;
  pages: number;
};

export type WorkerMemorizationType = {
  length: number;
  id: number;
  ayat: string;
  type: 'Hafalan' | 'Murojaah';
  id_surah: number;
  quran_surah: QuranSurah;
  status: string;
  date: Date | string;
  employee_input_id: number;
  employee_id: number;
  employee?: EmployeeType;
  employee_group_id: number;
  employee_group?: EmployeeGroupsType;
  group_session_id: number;
  group_session?: SessionGroupType;
};
