import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { TableSession } from '../../components';
import { TableDataMaster } from '../../components/TableDataMaster/TableDataMaster';

export const DataMaster: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Data Jam Pelajaran</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar Jam Pelajaran yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Jam Pelajaran
          </Button>
        </div>
        <div className="mt-7">
          <TableDataMaster />
        </div>
      </section>
    </main>
  );
};
