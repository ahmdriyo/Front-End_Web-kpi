import { ActionIcon, Table, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconPencil, IconInbox } from '@tabler/icons-react';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EvaluationQuranType, EvaluationType } from '@/admin_features/types';
import { WorkerMemorizationType } from '@/features/academics';
import { useAuth } from '@/features/auth';

import { useGetEvaluationQuran } from '../../api/evaluation_hafalan_api_feature';

export const EvaluationQuranTable: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('./login');
  const [dateFilter, setDateFilter] = useState<Date | null>(new Date());
  const formattedDate = dateFilter ? format(dateFilter, 'yyyy-MM-dd') : undefined;

  const { data: nilaiHafalan, isLoading } = useGetEvaluationQuran(
    creds?.company_id || 0,
    undefined,
    formattedDate
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const handleEdit = (dataNilai: WorkerMemorizationType) => {
    navigate('/evaluation/edit', { state: { data: dataNilai } });
    console.log(dataNilai);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <DatePickerInput
          className="max-w-sm"
          label="Pilih Tanggal"
          placeholder="Pilih Berdasarkan Tanggal"
          value={dateFilter}
          onChange={setDateFilter}
        />
      </div>

      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
              No
            </Table.Th>
            <Table.Th className="font-bold">Nama Siswa</Table.Th>
            <Table.Th className="font-bold">Kelas</Table.Th>
            <Table.Th className="font-bold">Mata Pelajaran</Table.Th>
            <Table.Th className="font-bold">Nama Surah</Table.Th>
            <Table.Th className="font-bold">Murojaah/Hafalan</Table.Th>
            <Table.Th className="font-bold">Ayat</Table.Th>
            <Table.Th className="font-bold">Keterangan</Table.Th>
            {/* <Table.Th className="font-bold flex justify-center">Aksi</Table.Th> */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {nilaiHafalan?.map((dataNilai: WorkerMemorizationType, index: number) => (
            <Table.Tr key={dataNilai.id}>
              <Table.Td style={{ width: 70, textAlign: 'center' }}>{index + 1}</Table.Td>
              <Table.Td>{dataNilai.employee?.name}</Table.Td>
              <Table.Td>{dataNilai.employee_group?.group.name}</Table.Td>
              <Table.Td>{dataNilai.group_session?.session.name}</Table.Td>
              <Table.Td>{dataNilai.quran_surah.surah_name || '-'}</Table.Td>
              <Table.Td>{dataNilai.type || '-'}</Table.Td>
              <Table.Td>{dataNilai.ayat || '-'}</Table.Td>
              <Table.Td>{dataNilai.status || '-'}</Table.Td>
              {/* <Table.Td className="flex justify-center gap-2">
                <ActionIcon color="blue" onClick={() => handleEdit(dataNilai)}>
                  <IconPencil size={14} />
                </ActionIcon>
              </Table.Td> */}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {(!nilaiHafalan || nilaiHafalan.length === 0) && (
        <div className="flex flex-col items-center justify-center text-center mt-4 h-[55vh]">
          <IconInbox size={80} className="text-gray-400" />
          <Text size="lg" w={700} className="mt-4">
            Tidak Ada Data
          </Text>
          <Text size="sm" color="dimmed" className="mt-2">
            Tidak ditemukan data untuk tanggal yang dipilih. Silakan pilih tanggal yang berbeda.
          </Text>
        </div>
      )}
    </div>
  );
};
