import { Button, Input, Select, Table } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

import { GroupType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
import { dataTahunAjaran } from '@/utils/tahunAjaran';

import { useGetEvaluationWorkers, useGetGroup, useGetSession } from '../../api';

const dataJam = [
  {
    id: '1',
    jam: '07:00 - 08:30',
  },
  {
    id: '2',
    jam: '08:30 - 10:00',
  },
  {
    id: '3',
    jam: '10:15 - 11:45',
  },
  {
    id: '4',
    jam: '12:15 - 13:45',
  },
  {
    id: '5',
    jam: '13:45 - 15:00',
  },
];

export const FormMapelSchedule: React.FC = () => {
  const { creds } = useAuth();
  const { data: dataSession } = useGetSession(creds?.company_id || 0);
  const { data: workers } = useGetEvaluationWorkers(creds?.company_id || 0, 2);
  const { data: groups } = useGetGroup(creds?.company_id || 0);

  const OptionsSession = dataSession?.map((session: any) => ({
    value: session.id.toString(),
    label: session.name,
  }));
  const OptionsWorkers = workers?.map((worker: any) => ({
    value: worker.id.toString(),
    label: worker.name,
  }));
  const OptionsGroups = groups?.map((group: GroupType) => ({
    value: group.name,
    label: group.name,
  }));

  const [rows, setRows] = useState([Array(5).fill({ mapel: '', jam: '' })]);

  const addRow = () => {
    const newRow = Array(5).fill({ mapel: '', jam: '' });
    setRows([...rows, newRow]);
  };
  return (
    <form>
      <Select
        style={{ width: '300px' }}
        label="Pilih Tahun ajaran"
        placeholder="Tahun ajaran"
        data={dataTahunAjaran}
      />
      <div className="flex flex-row gap-4 mt-2">
        <Select
          style={{ width: '300px' }}
          label="Pilih Kelas"
          placeholder="Kelas"
          data={OptionsGroups}
        />
        <Select
          style={{ width: '300px' }}
          label="Pilih Wali Kelas"
          placeholder="Wali Kelas"
          data={['Nur Malik', 'Subardi ', 'Nur Lima', 'Selamet']}
        />
        <Select
          style={{ width: '300px' }}
          label="Pilih Ketua Kelas"
          placeholder="Ketua Kelas"
          data={OptionsWorkers}
        />
      </div>
      {/* <Button onClick={addRow}>Tambah</Button> */}
      <div className=" mt-4">
        <h2 className="font-sans font-medium">Pilih Jam & Mapel</h2>
        <Table withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <div className="flex justify-center font-semibold">Jam</div>
              </Table.Th>
              <Table.Th>
                <div className="flex justify-center font-semibold">Senin</div>
              </Table.Th>
              <Table.Th>
                <div className="flex justify-center font-semibold">Selasa</div>
              </Table.Th>
              <Table.Th>
                <div className="flex justify-center font-semibold">Rabu</div>
              </Table.Th>
              <Table.Th>
                <div className="flex justify-center font-semibold">Kamis</div>
              </Table.Th>
              <Table.Th>
                <div className="flex justify-center font-semibold">Jumat</div>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {dataJam.map((data, index) => (
              <Table.Tr key={index}>
                <Table.Td>
                  <div className="flex flex-row gap-3 justify-center">
                    <Input
                      style={{ width: '150px' }}
                      placeholder="Mapel"
                      size="xs"
                      value={data.jam}
                    />
                  </div>
                </Table.Td>
                <Table.Td>
                  <div className="flex flex-row gap-3 justify-center">
                    <Select
                      style={{ width: '220px' }}
                      placeholder="Mapel"
                      size="xs"
                      data={OptionsSession}
                    />
                  </div>
                </Table.Td>
                <Table.Td>
                  <div className="flex flex-row gap-3">
                    <Select
                      style={{ width: '220px' }}
                      placeholder="Mapel"
                      size="xs"
                      data={OptionsSession}
                    />
                  </div>
                </Table.Td>
                <Table.Td>
                  <div className="flex flex-row gap-3">
                    <Select
                      style={{ width: '220px' }}
                      placeholder="Mapel"
                      size="xs"
                      data={OptionsSession}
                    />
                  </div>
                </Table.Td>
                <Table.Td>
                  <div className="flex flex-row gap-3">
                    <Select
                      style={{ width: '220px' }}
                      placeholder="Mapel"
                      size="xs"
                      data={OptionsSession}
                    />
                  </div>
                </Table.Td>
                <Table.Td>
                  <div className="flex flex-row gap-3">
                    <Select
                      style={{ width: '220px' }}
                      placeholder="Mapel"
                      size="xs"
                      data={OptionsSession}
                    />
                  </div>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Button className="mt-2" size="xs" onClick={addRow} leftSection={<IconPlus size={16} />}>
          Tambah Row
        </Button>
      </div>
      <div className="mt-10">
        <Button type="submit">Simpan</Button>
      </div>
    </form>
  );
};
