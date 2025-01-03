import { Divider, Text } from '@mantine/core';
import { IconChevronLeft, IconClockEdit, IconUsersGroup } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { GroupSessionsType } from '@/admin_features/types';

import { useGetQuranSurah } from '../../api';
import { ListMemorize } from '../../components/ListMemorize';
import { GroupType, SessionGroupType, SessionType } from '../../types';

export const Memorization: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const group = location.state.group as GroupType;
  const session = location.state.session as GroupSessionsType;
  const { data: DataSurah } = useGetQuranSurah();
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>
      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Hafalan Quran</h2>
          </div>
          <span className="font-semibold"></span>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-md rounded-lg flex flex-col mt-2 ">
        <div className="flex justify-between items-center text-blue-700 mb-1 px-2">
          <div className="flex items-center">
            <Text fw={700} c="blue">
              Kelas
            </Text>
          </div>
          <span className="font-semibold">
            <IconUsersGroup />
          </span>
        </div>
        <Divider size={'sm'} />
        <div className="grid grid-cols-12 px-2 mb-1">
          <div className="col-span-12 py-2">
            <div className="my-auto text-center">
              <Text lineClamp={1} size={'md'} fw={700}>
                {group.name}
              </Text>
            </div>
            <Divider className="w-full mt-2" />
            <div className="grid grid-cols-12 text-center">
              <div className="col-span-6">
                <Text size={'xs'} fw={500}>
                  Jumlah Siswa : {group && group.EmployeeGroups ? group.EmployeeGroups.length : '0'}
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
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-md rounded-lg flex flex-col mt-2 ">
        <div className="flex justify-between items-center text-blue-700 mb-1 px-2">
          <div className="flex items-center">
            <Text fw={700} c="blue">
              Mata Pelajaran
            </Text>
          </div>
          <span className="font-semibold">
            <IconClockEdit />
          </span>
        </div>
        <Divider size={'sm'} />
        <div className="grid grid-cols-12 px-2 mb-1">
          <div className="col-span-12 py-2">
            <div className="my-auto text-center">
              <Text lineClamp={1} size={'md'} fw={700}>
                {session.session.name}
              </Text>
            </div>
            <Divider className="w-full mt-2" />
            <div className="grid grid-cols-12 text-center">
              {/* <div className="col-span-6">
                <Text size={'xs'} fw={500}>
                  Jumlah Siswa :
                  {group && group.EmployeeGroups ? group.EmployeeGroups.length : '0'}
                </Text>
              </div>
              <div className="col-span-6">
                <Text size={'xs'} fw={500}>
                  Jumlah hadir : 4
                </Text>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-xs py-3 m-auto mt-2">
        <Divider size={'lg'} className="" />
      </section>

      <ListMemorize group={group} session={session} />
    </main>
  );
};
