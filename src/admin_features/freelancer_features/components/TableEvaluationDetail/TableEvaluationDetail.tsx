import { ActionIcon, Table } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React from 'react';

const evaluationData = [
  {
    id: 1,
    date: '01-11-2024',
    studentName: 'Ahmad',
    surahName: 'Al-Fatihah',
    type: 'Hafalan',
    ayat: '1-7',
    notes: 'Sangat baik',
  },
  {
    id: 2,
    date: '02-11-2024',
    studentName: 'Rohani',
    surahName: 'Al-Baqarah',
    type: 'Murojaah',
    ayat: '1-5',
    notes: 'Baik',
  },
  {
    id: 3,
    date: '03-11-2024',
    studentName: 'Abdullah',
    surahName: 'Ali Imran',
    type: 'Hafalan',
    ayat: '10-20',
    notes: 'Butuh bimbingan',
  },
  {
    id: 4,
    date: '04-11-2024',
    studentName: 'Fatimah Zahra',
    surahName: 'An-Nisa',
    type: 'Murojaah',
    ayat: '30-35',
    notes: 'Sangat baik',
  },
];
export const TableEvaluationDetail: React.FC = () => {
  return (
    <Table withColumnBorders withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="border border-slate-300 font-semibold p-4">No</Table.Th>
          <Table.Th className="border border-slate-300 font-semibold p-4">Tanggal</Table.Th>
          {/* <Table.Th className="border border-slate-300 font-semibold p-4">Nama Siswa</Table.Th> */}
          <Table.Th className="border border-slate-300 font-semibold p-4">Nama Surah</Table.Th>
          <Table.Th className="border border-slate-300 font-semibold p-4">
            Murojaah/Hafalan
          </Table.Th>
          <Table.Th className="border border-slate-300 font-semibold p-4">Ayat</Table.Th>
          <Table.Th className="border border-slate-300 font-semibold p-4">Keterangan</Table.Th>
          <Table.Th className="border border-slate-300 font-semibold p-4 flex justify-center">
            Aksi
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {evaluationData.map((evalItem, index) => (
          <Table.Tr key={evalItem.id}>
            <Table.Td className="border border-slate-300 p-4">{index + 1}</Table.Td>
            <Table.Td className="border border-slate-300 p-4">{evalItem.date}</Table.Td>
            {/* <Table.Td className="border border-slate-300 p-4">{evalItem.studentName}</Table.Td> */}
            <Table.Td className="border border-slate-300 p-4">{evalItem.surahName}</Table.Td>
            <Table.Td className="border border-slate-300 p-4">{evalItem.type}</Table.Td>
            <Table.Td className="border border-slate-300 p-4">{evalItem.ayat}</Table.Td>
            <Table.Td className="border border-slate-300 p-4">{evalItem.notes}</Table.Td>
            <Table.Td className="flex justify-center gap-2">
              <ActionIcon color="red">
                <IconTrash size={14} />
              </ActionIcon>
              <ActionIcon color="blue">
                <IconPencil size={14} />
              </ActionIcon>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
