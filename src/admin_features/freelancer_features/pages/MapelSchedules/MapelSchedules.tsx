import { ActionIcon, Button, Input, Select } from '@mantine/core';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { GroupType } from '@/admin_features/types';

import { TableSchedule } from '../../components/TableSchedule';

export const MapelSchedules: React.FC = () => {
  const [detailGroup, setDetailGroup] = useState<GroupType | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.detailGroup) {
      setDetailGroup(location.state.detailGroup);
    }
  }, [location.state]);
  return (
    <main>
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="font-bold">Daftar Jadwal Mapel</h2>
              <h2 className="text-xs text-slate-400">
                Berikut daftar jadwal yang terdaftar pada sistem
              </h2>
            </div>
            <Button
              className="mb-4"
              onClick={() => navigate('create')}
              leftSection={<IconPlus size={16} />}
            >
              Tambah Jadwal Mapel
            </Button>
          </div>
          <div className="flex gap-2 mt-2">
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
          </div>

          <div className=" flex flex-row gap-2 mt-4 mb-4">
            <div>
              <h2>Semester</h2>
              <Input component="button" style={{ width: '300px' }}>
                <h3 className="font-medium font-sans">Genap</h3>
              </Input>
            </div>
            <div>
              <h2>Kelas</h2>
              <Input component="button" style={{ width: '300px' }}>
                <h3 className="font-medium font-sans">XII MIA 2</h3>
              </Input>
            </div>
            <div>
              <h2>Wali Kelas</h2>
              <Input component="button" style={{ width: '300px' }}>
                <h3 className="font-medium font-sans">Muhammand Ali</h3>
              </Input>
            </div>
            <div>
              <h2>Ketua Kelas</h2>
              <Input component="button" style={{ width: '300px' }}>
                <h3 className="font-medium font-sans">Bagas Putra</h3>
              </Input>
            </div>
          </div>
          {/* <h3 className="font-medium font-sans text-gray-600 mt-2">
              Tahun 2021/2022 Genap XI MIA 2{'>'} Wali kelas Fitri Andini {'>'} Ketua Kelas Muhammad
              Sarifudin
            </h3> */}
        </div>
        <div className="flex justify-between">
          <div></div>
        </div>
        <TableSchedule />
      </section>
    </main>
  );
};
