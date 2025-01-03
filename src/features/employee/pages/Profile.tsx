/* eslint-disable import/order */
import {
  IconChevronRight,
  IconLogout,
  IconUser,
  IconBriefcase,
  IconSchool,
  IconFiles,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { EmployeeType } from '@/admin_features/types';
import { useGetEmployee } from '../api/Profile';
import { useEffect, useState } from 'react';

export const Profile: React.FC = () => {
  const { creds, logout } = useAuth();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee } = useGetEmployee(creds?.employee_id);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);

  return (
    <main className="py-12">
      {/* Profile Picture */}
      <section className="flex m-3 shadow-md rounded-xl gap-4 items-center p-4 bg-white">
        <div className="bg-slate-500 text-white rounded-full p-4">
          <IconUser className="w-10 h-10" />
        </div>
        <div className="font-bold text-lg">
          {employee?.name}
          <div className="text-sm text-gray-600 flex gap-1 items-center">
            <IconBriefcase size={20} /> <span className="font-semibold">{creds?.role}</span>
          </div>
        </div>
      </section>

      {/* Detail or Sensitive Information about User */}
      <section className="w-full mt-8 px-5 flex flex-col divide-y divide-gray-300">
        {/* Data Diri */}
        <button
          onClick={() => navigate('/profile/biodata')}
          className="bg-transparent text-left flex w-full items-center py-3 hover:bg-slate-100 ps-2"
        >
          <div className="bg-blue-600 text-white rounded-lg p-2">
            <IconUser size={25} />
          </div>
          <div className="font-semibold px-4 flex-grow text-sm">Data Diri</div>
          <IconChevronRight size={25} />
        </button>

        {/* Data Pendidikan */}
        <button
          onClick={() => navigate('/profile/edu-background')}
          className="bg-transparent text-left flex w-full items-center py-3 hover:bg-slate-100 ps-2"
        >
          <div className="bg-blue-600 text-white rounded-lg p-2">
            <IconSchool size={25} />
          </div>
          <div className="font-semibold px-4 flex-grow text-sm">Data Pendidikan</div>
          <IconChevronRight size={25} />
        </button>

        {/* Data Berkas */}
        <button
          onClick={() => navigate('/profile/file')}
          className="bg-transparent text-left flex w-full items-center py-3 hover:bg-slate-100 ps-2"
        >
          <div className="bg-blue-600 text-white rounded-lg p-2">
            <IconFiles size={25} />
          </div>
          <div className="font-semibold px-4 flex-grow text-sm">Kelengkapan Berkas</div>
          <IconChevronRight size={25} />
        </button>

        {/* Data Berkas */}

        <button
          onClick={() => logout()}
          className="bg-transparent text-left flex w-full items-center py-3 hover:bg-slate-100 ps-2"
        >
          <div className="bg-red-600 text-white rounded-lg p-2">
            <IconLogout size={25} />
          </div>
          <div className="font-semibold px-4 flex-grow text-sm">Logout</div>
          <IconChevronRight size={25} />
        </button>
      </section>
    </main>
  );
};
