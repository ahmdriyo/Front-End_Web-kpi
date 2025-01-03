import { Badge, Button, Divider, Indicator, Menu, Text } from '@mantine/core';
import {
  IconBook2,
  IconCalendarClock,
  IconChevronDown,
  IconClockEdit,
  IconUsersGroup,
} from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatterDate } from '@/features/history';
import storage from '@/utils/storage';

import { useGetSessionByGroup } from '../api';
import { useGetEvaluationQuranByGroupSession } from '../api/getEvaluationQuran';
import {
  GroupType,
  SessionGroupType,
  SessionType,
  WorkerAttendanceType,
  WorkerMemorizationType,
} from '../types';

type ListSessionProps = {
  group: GroupType;
};
export const ListSession: React.FC<ListSessionProps> = ({ group }: ListSessionProps) => {
  const BaseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionGroupType[]>([]);
  const { data: DataSession } = useGetSessionByGroup(group.id);
  useEffect(() => {
    if (DataSession) {
      setSessions(DataSession);
    }
  }, [DataSession]);

  const [sessionList, setSessionList] = useState<
    {
      session: SessionGroupType;
      laborerAttendance: WorkerAttendanceType;
      laborerMemorization: WorkerMemorizationType;
    }[]
  >([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const allAttendance = await Promise.all(
          sessions.map(async (session) => {
            const attendanceUrl = `${BaseURL}/worker-attendance?date=${formatterDate(new Date(), 'yyyy-MM-dd')}&session=${session.session_id}&group=${group.id}`;
            const memorizationUrl = `${BaseURL}/evaluation-quran?date=${formatterDate(new Date(), 'yyyy-MM-dd')}&session=${session.session_id}&group=${group.id}`;

            const headers = {
              Authorization: `Bearer ${storage.getToken()}`,
            };

            const [attendanceResponse, memorizationResponse] = await Promise.allSettled([
              axios.get(attendanceUrl, { headers }),
              axios.get(memorizationUrl, { headers }),
            ]);

            const responseAttendance =
              attendanceResponse.status === 'fulfilled' ? attendanceResponse.value.data.data : [];

            const responseHafalan =
              memorizationResponse.status === 'fulfilled'
                ? memorizationResponse.value.data.data
                : [];

            return {
              session,
              laborerAttendance: responseAttendance,
              laborerMemorization: responseHafalan,
            };
          })
        );

        setSessionList(allAttendance);
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setSessionList([]);
      }
    };

    if (sessions.length > 0) {
      fetchAttendance();
    }
  }, [sessions]);

  return (
    <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-md rounded-lg flex flex-col mt-2 mb-8 ">
      <div className="flex justify-between items-center text-blue-700 mb-1 px-2">
        <div className="flex items-center">
          <Text fw={700} c="blue">
            Daftar Mata Pelajaran
          </Text>
        </div>
        <span className="font-semibold">
          <IconClockEdit />
        </span>
      </div>
      <Divider size={'sm'} />
      {/* <div className="grid grid-cols-12 px-2 text-center gap-x-1 mx-auto">
        <div className="col-span-6 flex rounded-md mt-1 ">
          <Indicator inline color={'green'} size={10} className="mt-2 me-3"></Indicator>
          <Text size={'xs'} c={'green'}>
            Sudah absen
          </Text>
        </div>
        <div className="col-span-6 flex rounded-md mt-1 ms-2">
          <Indicator inline color={'red'} size={10} className="mt-2 me-3"></Indicator>
          <Text size={'xs'} c={'red'}>
            Belum absen
          </Text>
        </div>
      </div> */}
      {/* <div className="mt-2">
        <Divider size={'lg'} />
      </div> */}
      {sessionList.length > 0 ? (
        sessionList.map((labAtt, index) => (
          <div key={index} className={`text-left px-2 shadow-md mt-2 mb-2 bg-white`}>
            <div className="py-3">
              <div className="flex justify-between items-center">
                <Text lineClamp={1} size={'md'} fw={700}>
                  {/* {session.session.name} */}
                  {labAtt.session.session.name}
                </Text>
                {/* <div className="flex items-center">
                    <Badge
                      size="xs"
                      className="uppercase rounded-sm"
                      color={labAtt.laborerAttendance.length != 0 ? 'green' : 'red'}
                    >
                      {labAtt.laborerAttendance.length != 0 ? 'sudah absen' : 'belum absen'}
                    </Badge>
                    <Indicator
                      inline
                      color={labAtt.laborerAttendance.length == 0 ? 'red' : 'green'}
                      size={10}
                      className="mb-1 me-1"
                    ></Indicator>
                  </div> */}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2 mb-1">
                <Button
                  variant="filled"
                  size="xs"
                  rightSection={<IconCalendarClock style={{ width: '16px', height: '16px' }} />}
                  disabled={labAtt.laborerAttendance.length > 0}
                  color={labAtt.laborerAttendance.length != 0 ? 'green' : 'red'}
                  onClick={() =>
                    navigate(`/laborer-group/session/laborer`, {
                      state: { group: group, session: labAtt.session },
                    })
                  }
                >
                  {labAtt.laborerAttendance.length != 0 ? 'sudah absen' : 'isi absen'}
                </Button>
                <Menu>
                  <Menu.Target>
                    <Button
                      variant="filled"
                      size="xs"
                      justify="space-between"
                      leftSection={<span />}
                      rightSection={<IconChevronDown />}
                    >
                      Penilaian
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconBook2 style={{ width: '20px', height: '20px' }} />}
                      disabled={labAtt.laborerMemorization.length > 0}
                      onClick={() =>
                        navigate(`/laborer-group/session/memorize-quran`, {
                          state: { group: group, session: labAtt.session },
                        })
                      }
                    >
                      {labAtt.laborerMemorization.length != 0 ? 'Hafalan Terisi' : 'Hafalan Quran'}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full col-span-12">
          <section className="min-h-96 flex flex-col items-center justify-center -mt-10 -mb-13">
            <img
              className="w-28 mb-2 bg-slate-200 rounded-full p-2"
              src="/images/blank-canvas.svg"
              alt=""
            />
            <span className="font-bold text-slate-400 text-base">
              Belum ada data Mata Pelajaran
            </span>
          </section>
        </div>
      )}
    </section>
  );
};
