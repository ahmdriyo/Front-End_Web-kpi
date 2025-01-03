import { Badge, Divider, Loader, Text, Transition } from '@mantine/core';
import { differenceInDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { formatterDate, useGetAbsenceByType } from '../api';
import { AbsenceType } from '../types';

type AbsenceProps = {
  typeAbsence: string;
  status: string;
};

export const AbsenceList: React.FC<AbsenceProps> = ({ typeAbsence, status }) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [absences, setAbsence] = useState<AbsenceType[]>([]);
  const [params, setParams] = useState({
    employeeId: creds?.employee_id,
    typeAbsence: typeAbsence,
  });

  const { data, error, isLoading } = useGetAbsenceByType(
    params.employeeId,
    params.typeAbsence,
    status
  );

  useEffect(() => {
    if (data) {
      setAbsence(data);
    }
  }, [data]);

  useEffect(() => {
    const newParams = {
      employeeId: creds?.employee_id,
      typeAbsence,
    };
    setParams(newParams);
  }, [typeAbsence]);

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-600 text-center my-20 font-bold">{error.message}</div>;
  }

  function getDaysBetweenDates(date1: string, date2: string): number {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    return differenceInDays(endDate, startDate);
  }

  return (
    <>
      <div className="text-center">
        {absences.length > 0 ? (
          absences.map((absence, index) => (
            <button
              key={index}
              onClick={() => navigate(`/history/data-absence/${absence.id}`)}
              className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700"
            >
              <div className="w-full grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
                {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
                <div className="col-span-2 text-center -ms-3">
                  <Text size="30px" fw={700}>
                    {absence?.date_start != undefined || absence?.date_end != null
                      ? getDaysBetweenDates(absence?.date_start, absence?.date_end) + 1
                      : '-- --'}
                  </Text>
                  <Text style={{ marginTop: '-5px' }} size="xs">
                    Hari
                  </Text>
                </div>
                <div className="col-span-10">
                  <div className="my-auto text-right -mt-3 -me-3">
                    <Badge
                      size="xs"
                      style={{
                        marginTop: '7px',
                        marginLeft: '4px',
                        borderRadius: '2px',
                      }}
                      color={absence?.type == 'sakit' ? 'yellow' : 'blue  '}
                    >
                      {absence?.type}
                    </Badge>
                    <Badge
                      size="xs"
                      style={{
                        marginTop: '7px',
                        marginLeft: '4px',
                        borderRadius: '2px',
                      }}
                      color={
                        absence?.status == 'Disetujui'
                          ? 'green'
                          : absence.status == 'Ditolak'
                            ? 'red'
                            : 'yellow'
                      }
                    >
                      {absence?.status}
                    </Badge>
                  </div>
                  <div className="my-auto text-center mt-1">
                    <Divider orientation="vertical" />
                    <Text size="18px" fw={700}>
                      {absence?.date_start != undefined && absence?.date_end != null
                        ? formatterDate(absence?.date_start, 'EEEE, dd MMM yyyy')
                        : '-- --'}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <Text style={{ marginLeft: '0px', padding: '8px' }} size="11px" fw={500}>
                  Tanggal pengajuan :{' '}
                  {absence?.created_at != undefined || absence?.date_end != null
                    ? formatterDate(absence?.created_at, 'EEEE dd MMMM yyyy')
                    : '-- --'}
                </Text>
              </div>
            </button>
          ))
        ) : (
          <section className="min-h-96 flex flex-col items-center justify-center">
            <img
              className="w-28 mb-2 bg-slate-200 rounded-full p-2"
              src="/images/blank-canvas.svg"
              alt=""
            />
            <span className="font-bold text-slate-400 text-sm">
              Belum ada pengajuan {typeAbsence}
            </span>
          </section>
        )}
      </div>
    </>
  );
};
