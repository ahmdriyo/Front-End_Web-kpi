import { Avatar, Divider, Loader, Text } from '@mantine/core';
import { IconSchool } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetGroupByCompany } from '../api';
import { GroupType } from '../types';

export const ListLaborerGroup: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const [groups, setGroups] = useState<GroupType[]>([]);
  const { data: DataGroups, isLoading: LoadingGroups } = useGetGroupByCompany(creds?.company_id);
  useEffect(() => {
    if (DataGroups) {
      setGroups(DataGroups);
    }
  }, [DataGroups]);

  if (LoadingGroups) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  return (
    <div className="text-center mt-2 mb-10">
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <button
            key={index}
            onClick={() => navigate(`/laborer-group/session`, { state: { group: group } })}
            className="bg-white text-left max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative px-2 text-slate-700 mb-2"
          >
            {/* <div className="w-full grid grid-cols-12 -mb-2 p-4">
              <div className="col-span-12 py-2 -mt-2">
                <div className="my-auto text-center">
                  <Text lineClamp={1} size={'md'} fw={700}>
                    {group.name}
                  </Text>
                </div>
                <Divider className="w-full mt-2" />
                <div className="grid grid-cols-12 text-center">
                  <div className="col-span-6">
                    <Text size={'xs'} fw={500}>
                      Jumlah Siswa :{' '}
                      {group && group.EmployeeGroups ? group.EmployeeGroups.length : '0'}
                    </Text>
                  </div>
                  <div className="col-span-6">
                    <Text size={'xs'} fw={500}>
                      Jumlah Mata Pelajaran :{' '}
                      {group && group.GroupSessions ? group.GroupSessions.length : '0'}
                    </Text>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="py-4 px-3" style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={36} color="blue">
                <IconSchool size={24} className="text-blue-600" />
              </Avatar>
              <div className="ml-5">
                <Text fw={600} size="lg">
                  {group.name}
                </Text>
                <p className="text-gray-600 text-sm">
                  {group && group.EmployeeGroups ? group.EmployeeGroups.length : '0'} Siswa,{' '}
                  {group && group.GroupSessions ? group.GroupSessions.length : '0'} Mata Pelajaran
                </p>
              </div>
            </div>
          </button>
        ))
      ) : (
        <div className="w-full col-span-12">
          <section className="min-h-96 flex flex-col items-center justify-center -mt-10 -mb-13">
            <img
              className="w-28 mb-2 bg-slate-200 rounded-full p-2"
              src="/images/blank-canvas.svg"
              alt=""
            />
            <span className="font-bold text-slate-400 text-base">Belum ada data Kelas</span>
          </section>
        </div>
      )}
    </div>
  );
};
