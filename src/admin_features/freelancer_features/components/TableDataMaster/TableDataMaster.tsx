import { ActionIcon, Table } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { SessionType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetSession } from '../../api';

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

export const TableDataMaster: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('/login');

  const { data, isLoading, isError } = useGetSession(creds?.company_id || 0);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      {data?.length < 1 ? (
        <div className="h-80 flex justify-center items-center">Data jam Tidak Ditemukan</div>
      ) : (
        <div>
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
                  No
                </Table.Th>
                <Table.Th className="font-bold">Jam pelajaran</Table.Th>
                <Table.Th className="flex gap-2 items-center justify-center font-bold">
                  Aksi
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {dataJam?.map((data, index) => (
                <Table.Tr key={index}>
                  <Table.Td style={{ width: 70, textAlign: 'center' }}>{index + 1}</Table.Td>
                  <Table.Td>{data.jam}</Table.Td>
                  <Table.Td className="flex gap-2 items-center justify-center">
                    <ActionIcon color="red">
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      )}
    </div>
  );
};
