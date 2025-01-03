import { Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { IconPencil } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { formatDateToString } from '@/utils/format';

import { useGetActivityAlias } from '../api';
import { TableActivitys } from '../components';

export const Activitys: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const { state } = useLocation();
  if (creds === null) navigate('/login');

  const hasNotifiedRef = useRef(false);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    if (state?.success && !hasNotifiedRef.current) {
      notifications.show({
        message: state.success,
        color: 'green',
      });
      hasNotifiedRef.current = true;
    }
  });

  const { data: DataActivityAlias, isLoading: LoadingActivityAlias } = useGetActivityAlias(
    creds?.company_id
  );

  if (LoadingActivityAlias) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Aktivitas</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar aktivitas karyawan pada hari ini
            </div>
          </div>
          {DataActivityAlias.length > 0 && (
            <Button
              onClick={() => navigate('update')}
              leftSection={<IconPencil size={14}></IconPencil>}
            >
              Update Aktivitas
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <DatePickerInput
            className="max-w-56"
            placeholder="Pick date"
            value={date}
            onChange={(value) => setDate(value as Date)}
          />
        </div>
        <div className="mt-7">
          <TableActivitys date={formatDateToString(date.toString())} />
        </div>
      </section>
    </main>
  );
};
