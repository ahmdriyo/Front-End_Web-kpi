import { ActionIcon, Button } from '@mantine/core';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { GroupType } from '@/admin_features/types';

import { TableSchedule } from '../../components/TableSchedule';

export const Schedule: React.FC = () => {
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
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="flex flex-row">
              <ActionIcon onClick={() => navigate(-1)} color="blue" className="mt-1 mr-4">
                <IconChevronLeft size={20} />
              </ActionIcon>
              <div>
                <h2 className="font-bold">Daftar Jadwal</h2>
                <h2 className="text-xs text-slate-400">
                  Berikut daftar jadwal yang terdaftar pada sistem
                </h2>
              </div>
            </div>
            <h3 className="font-medium font-sans text-gray-600 mt-5">
              Kelas {detailGroup?.name} {'>'} Semester Ganjil {'>'} Wali kelas Fitri Andini {'>'}{' '}
              Ketua Kelas Muhammad Sarifudin
            </h3>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Kelompok
          </Button>
        </div>
        <div className="flex gap-2"></div>
        <div className="">
          <TableSchedule />
        </div>
      </section>
    </main>
  );
};
