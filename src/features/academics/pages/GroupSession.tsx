import { Button, Divider, Menu, Text } from '@mantine/core';
import {
  IconCalendarClock,
  IconChevronLeft,
  IconChevronDown,
  IconUsersGroup,
  IconBook2,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { ListSession } from '../components';
import { GroupType } from '../types';

export const GroupSession: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const group = location.state.group as GroupType;

  // [NOTIFICATION 🔔]
  const { state } = useLocation();
  useEffect(() => {
    const hasNotified = localStorage.getItem('hasNotifiedLaborerAttendance');
    if (state?.success && hasNotified != 'yes') {
      Swal.fire({
        width: '80%',
        title: state.success,
        timer: 3000,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      localStorage.setItem('hasNotifiedLaborerAttendance', 'yes');
    }
  }, [state, navigate]);
  // [END NOTIFICATION 🔔]

  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>
      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate('/laborer-group');
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Detail Kelas</h2>
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
                  Jumlah Siswa :{group && group.EmployeeGroups ? group.EmployeeGroups.length : '0'}
                </Text>
              </div>
              <div className="col-span-6">
                <Text size={'xs'} fw={500}>
                  Jumlah Mata Pelajaran :
                  {group && group.GroupSessions ? group.GroupSessions.length : '0'}
                </Text>
              </div>
              {/* <div className="col-span-12 mt-3">
                <Menu shadow="md" width={280}>
                  <Menu.Target>
                    <Button
                      fullWidth
                      justify="space-between"
                      size="sm"
                      type="submit"
                      leftSection={<span />}
                      rightSection={<IconChevronDown />}
                    >
                      Lihat riwayat
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Absensi</Menu.Label>
                    <Menu.Item
                      leftSection={<IconCalendarClock style={{ width: '20px', height: '20px' }} />}
                      onClick={() =>
                        navigate(`/laborer-group/history`, { state: { group: group } })
                      }
                    >
                      Absensi
                    </Menu.Item>
                    <Menu.Label>Penilaian</Menu.Label>
                    <Menu.Item
                      leftSection={<IconBook2 style={{ width: '20px', height: '20px' }} />}
                      onClick={() =>
                        navigate(`/laborer-group/history`, { state: { group: group } })
                      }
                    >
                      Hafalan Quran
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-xs py-3 m-auto mt-2">
        <Divider size={'lg'} className="" />
      </section>

      <ListSession group={group} />
    </main>
  );
};
