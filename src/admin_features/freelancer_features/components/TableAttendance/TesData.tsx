import { Badge, Divider, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { GroupType, SessionType } from '@/admin_features/types';
import {
  useGetSession,
  useGetWorkerAttendanceByGroup,
  WorkerAttendanceType,
} from '@/features/academics';
import { formatterDate } from '@/features/history';

const TesData = () => {
  const location = useLocation();
  const group = 58;

  const [valueSelectSession, setValueSelectSession] = useState<string | null>('');
  const [selectedSessionLabel, setSelectedSessionLabel] = useState<string>('');

  const [session, setSession] = useState<{ value: string; label: string }[]>([]);
  const { data: DataSession, isLoading: LoadingSession } = useGetSession(group);

  useEffect(() => {
    if (DataSession) {
      const sessionOptions = DataSession.map((session: SessionType) => ({
        value: session.id.toString(),
        label: session.name,
      }));
      setSession(sessionOptions);
    }
  }, [DataSession]);
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const [LaborerAttendances, setLaborerAttendances] = useState<WorkerAttendanceType[]>([]);
  const { data: DataLaborerAttendance } = useGetWorkerAttendanceByGroup(
    formatterDate(dateValue, 'yyyy-MM-dd'),
    group,
    valueSelectSession ?? session[0].value
  );
  useEffect(() => {
    if (DataLaborerAttendance) {
      setLaborerAttendances(DataLaborerAttendance);
    }
  }, [DataLaborerAttendance, valueSelectSession]);

  const handleSelectChange = (value: string | null) => {
    const selectedOption = session.find((option) => option.value === value);
    setSelectedSessionLabel(selectedOption ? selectedOption.label : '');
    setValueSelectSession(selectedOption ? selectedOption.value : '');
  };
  return (
    <div>
      {LaborerAttendances.length > 0 ? (
        LaborerAttendances.map((labAtt, index) => (
          <div key={index} className="grid grid-cols-12 px-2 mb-1 -mt-4">
            <div className="col-span-12 py-2">
              <div className="my-auto">
                <div className="text-end mb-1">
                  {selectedSessionLabel && (
                    <Badge
                      size="sm"
                      className="uppercase me-1"
                      style={{
                        borderRadius: '2px',
                      }}
                      color={'grape'}
                    >
                      {selectedSessionLabel}
                    </Badge>
                  )}
                  <Badge
                    size="sm"
                    className="uppercase"
                    style={{
                      borderRadius: '2px',
                    }}
                    color={
                      labAtt.attendance_status == 'H'
                        ? 'green'
                        : labAtt.attendance_status == 'A'
                          ? 'red'
                          : 'yellow'
                    }
                  >
                    {labAtt.attendance_status == 'H'
                      ? 'Hadir'
                      : labAtt.attendance_status == 'A'
                        ? 'Absen'
                        : 'Izin'}
                  </Badge>
                </div>
                <div>
                  <Text lineClamp={1} size={'sm'} fw={800}>
                    {labAtt.employee.name}
                  </Text>
                </div>
              </div>
              <Divider className="w-full mt-1 mb-1" />
              <div className="grid grid-cols-12 text-left mb-4">
                <div className="col-span-4">
                  <Text size={'xs'} fw={500}>
                    Keterangan :
                  </Text>
                </div>
                <div className="col-span-4">
                  <Text size={'xs'} fw={500}>
                    {labAtt.detail}
                  </Text>
                </div>
              </div>
              <div className="mt-4">
                <Divider size={'lg'} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full col-span-12">
          <section className="min-h-96 flex flex-col items-center justify-center -mt-10 -mb-15">
            <img
              className="w-28 mb-2 bg-slate-200 rounded-full p-2"
              src="/images/blank-canvas.svg"
              alt=""
            />
            <span className="font-bold text-slate-400 text-base">Belum ada data absensi siswa</span>
          </section>
        </div>
      )}
    </div>
  );
};

export default TesData;
