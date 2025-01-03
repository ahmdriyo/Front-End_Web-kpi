import { ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useCreateWorker, WorkerCreateType } from '../../api';
import { FormFreelancer } from '../../components';

export const CreateFreelancer: React.FC = () => {
  const navigate = useNavigate();
  const createWorker = useCreateWorker();

  const handleSubmit = (data: WorkerCreateType) => {
    createWorker.mutateAsync(data, {
      onSuccess: () => {
        setTimeout(() => {
          notifications.show({
            title: 'Berhasil',
            message: 'Siswa berhasil ditambahkan',
            color: 'teal',
          });
        }, 500);
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
              <h2 className="font-bold">Tambah Siswa</h2>
            </div>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan Siswa
            </div>
          </div>
        </div>
        <div className="mt-5">
          <FormFreelancer onsubmit={handleSubmit} />
        </div>
      </section>
    </main>
  );
};
