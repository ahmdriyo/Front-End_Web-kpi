// const Evaluation = () => {
//   return <div>Evaluation</div>;
// };
// export default Evaluation;

import { Button, Input, Select } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { TableEvaluation } from '../../components';
import { TableSchedule } from '../../components/TableSchedule';

// import { TableFreelancer } from '../../components';
export const Evaluation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Data Penilaian</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar Penilaian yang terdaftar pada sistem
            </div>
          </div>
          {/* <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Penilaian
          </Button> */}
        </div>
        <div className="mt-3">
          {/* Menampilkan Data Pekerja */}
          {/* <TableFreelancer /> */}
          {/* <TableEvaluation /> */}
          <div className="flex gap-2 mt-2">
            <Select
              className=""
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
          <div className="flex flex-row gap-2 mt-4 mb-4">
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
          <TableEvaluation />
        </div>
      </section>
    </main>
  );
};
