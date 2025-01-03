import { ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { EvaluationFormType, usePostEvaluation } from '../../api';
import { FormEvaluation } from '../../components';

export const CreateEvaluation: React.FC = () => {
  const navigate = useNavigate();
  const mutate = usePostEvaluation();

  const handleSubmit = async (data: EvaluationFormType) => {
    await mutate.mutateAsync(data, {
      onSuccess: () => {
        notifications.show({
          message: 'Berhasil Menambahkan Penilaian',
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
              <h2 className="font-bold">Tambah Data Penilaian</h2>
            </div>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan Data Penilaian
            </div>
          </div>
        </div>
        <div className="mt-5">
          <FormEvaluation onsubmit={handleSubmit} />
        </div>
      </section>
    </main>
  );
};
