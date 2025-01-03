import { Table } from '@mantine/core';

import { useAuth } from '@/features/auth';

import { useGetGroup } from '../../api';

const dummySchedule = [
  {
    time: '07:00 - 08:30',
    monday: 'Matematika',
    tuesday: 'Bahasa Indonesia',
    wednesday: 'Fisika',
    thursday: 'Kimia',
    friday: 'Sejarah',
  },
  {
    time: '08:30 - 10:00',
    monday: 'Biologi',
    tuesday: 'Matematika',
    wednesday: 'Bahasa Inggris',
    thursday: 'Ekonomi',
    friday: 'Geografi',
  },
  {
    time: '10:15 - 11:45',
    monday: 'Kimia',
    tuesday: 'Seni Budaya',
    wednesday: 'Matematika',
    thursday: 'Bahasa Inggris',
    friday: 'Biologi',
  },
  {
    time: '12:15 - 13:45',
    monday: 'Sejarah',
    tuesday: 'Fisika',
    wednesday: 'Bahasa Indonesia',
    thursday: 'Matematika',
    friday: 'Olahraga',
  },
  {
    time: '13:45 - 15:00',
    monday: 'Matematika',
    tuesday: 'Fisika',
    wednesday: 'Bahasa Indonesia',
    thursday: 'PKN',
    friday: 'Olahraga',
  },
];

export const TableSchedule: React.FC = () => {
  const { creds } = useAuth();

  const { data, isLoading, isError } = useGetGroup(creds?.company_id || 0);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      {data?.length < 1 ? (
        <div className="h-64 flex justify-center items-center">Data Kelompok tidak ditemukan</div>
      ) : (
        <Table withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: 70, textAlign: 'center' }}>Jam</Table.Th>
              <Table.Th className="font-semibold">Senin</Table.Th>
              <Table.Th className="font-semibold">Selasa</Table.Th>
              <Table.Th className="font-semibold">Rabu</Table.Th>
              <Table.Th className="font-semibold">Kamis</Table.Th>
              <Table.Th className="font-semibold">Jumat</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {dummySchedule.map((schedule, index) => (
              <Table.Tr key={index}>
                <Table.Td style={{ width: 130, textAlign: 'center' }}>{schedule.time} </Table.Td>
                <Table.Td>{schedule.monday}</Table.Td>
                <Table.Td>{schedule.tuesday}</Table.Td>
                <Table.Td>{schedule.wednesday}</Table.Td>
                <Table.Td>{schedule.thursday}</Table.Td>
                <Table.Td>{schedule.friday}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </div>
  );
};
