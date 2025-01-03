import { ActionIcon, Button, Input } from '@mantine/core';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
// import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TableEvaluationDetail } from '../../components/TableEvaluationDetail';

export const EvaluationDetail: React.FC = () => {
  const navigate = useNavigate();
  // const { groupId } = useParams<{ groupId: string }>();
  // const [evaluationData, setEvaluationData] = useState<any[]>([]);
  const location = useLocation();
  const { sesi, kelas } = location.state || {};
  return (
    <main>
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-row">
            <ActionIcon onClick={() => navigate(-1)} color="blue" className="mt-1 mr-4">
              <IconChevronLeft size={20} />
            </ActionIcon>
            <div>
              <h2 className="font-bold">Detail Penilaian : AHMAD ZULKFIKRI RAMADHAN</h2>
              <div className="-mt-1 text-xs text-slate-400">Berikut daftar penilaian siswa</div>
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Penilaian
          </Button>
        </div>
        <div className=" flex flex-row gap-2 mt-4 mb-4">
          <div>
            <h2>Tahun Ajaran</h2>
            <Input component="button" style={{ width: '260px' }}>
              <h3 className="font-medium font-sans">Tahun 2020/2021</h3>
            </Input>
          </div>
          <div>
            <h2>Semester</h2>
            <Input component="button" style={{ width: '260px' }}>
              <h3 className="font-medium font-sans">Genap</h3>
            </Input>
          </div>
          <div>
            <h2>Kelas</h2>
            <Input component="button" style={{ width: '260px' }}>
              <h3 className="font-medium font-sans">XII MIA 2</h3>
            </Input>
          </div>
          <div>
            <h2>Wali Kelas</h2>
            <Input component="button" style={{ width: '260px' }}>
              <h3 className="font-medium font-sans">Muhammand Ali</h3>
            </Input>
          </div>
          <div>
            <h2>Ketua Kelas</h2>
            <Input component="button" style={{ width: '260px' }}>
              <h3 className="font-medium font-sans">Bagas Putra</h3>
            </Input>
          </div>
        </div>
        <TableEvaluationDetail />
      </section>
    </main>
  );
};
