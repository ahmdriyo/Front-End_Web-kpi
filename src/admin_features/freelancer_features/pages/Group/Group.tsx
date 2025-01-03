import { Button, Select } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { TableGroup } from '../../components';

export const Group: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Data Kelas</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar kelas yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Kelas
          </Button>
        </div>
        {/* <div className="flex gap-2 mt-2">
          <Select
            style={{ width: '300px' }}
            label="Pilih Tahun ajaran"
            placeholder="Pick value"
            defaultValue="React"
            clearable
            data={[
              'Tahun 2021/2022 Genap XI MIA 2',
              'Tahun 2021/2022 Ganjil XI MIA 2',
              'Tahun 2022/2023 Genap XI MIA 2',
              'Tahun 2022/2023 Ganjil XI MIA 2',
            ]}
          />
        </div> */}
        <div className="flex gap-2"></div>
        <div className="mt-7">
          <TableGroup />
        </div>
      </section>
    </main>
  );
};
