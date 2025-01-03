import { ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { GroupFormType, usePostGroup } from '../../api';
import { FormGroup } from '../../components';
import { FormMapelSchedule } from '../../components/FormMapelSchedule';

export const MapelScheduleCreate: React.FC = () => {
  const navigate = useNavigate();
  const mutate = usePostGroup();

  const handleSubmit = async (data: GroupFormType) => {
    await mutate.mutateAsync(data, {
      onSuccess: () => {
        notifications.show({
          message: 'Berhasil Menambahkan Jadwal',
          color: 'blue',
        });
        navigate(-1);
      },
    });
  };
  return (
    <main>
      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-start">
          <ActionIcon onClick={() => navigate(-1)} color="blue" className="mt-1">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <div className="flex gap-3 items-center">
              <h2 className="font-bold">Tambah Jadwal Mapel</h2>
            </div>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan Jadwal Mapel
            </div>
          </div>
        </div>
        <div className="mt-5">
          <FormMapelSchedule />
        </div>
      </section>
    </main>
  );
};
