import { Badge, Button, Select, Table } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AttendanceWorkerType, GroupType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetAttendanceWorker, useGetGroup, useGetWorkers } from '../../api';

export const TableAttendance: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('./login');

  const { data: dataGroup, isLoading: LoadGroup } = useGetGroup(creds?.company_id || 0);

  const [groupPicker, setGroupPicker] = useState<string | undefined>(undefined);
  const [dateFilter, setDateFilter] = useState<Date | null>(new Date());
  const [nameFilter, setNameFilter] = useState<string | undefined>(undefined);

  const { data: fetchedData, isLoading } = useGetAttendanceWorker(
    creds?.company_id || 0,
    groupPicker ? parseInt(groupPicker) : undefined,
    dateFilter ? dateFilter.toLocaleDateString('en-CA') : undefined,
    nameFilter || ''
  );

  const { data: workerOptions } = useGetWorkers(creds?.company_id || 0, nameFilter);

  // useEffect(() => {
  //   console.log('data name', creds?.company_id);
  // });

  const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';
  const handleGetReport = async () => {
    if (groupPicker && dateFilter) {
      const formattedDate = dateFilter.toISOString().split('T')[0];
      window.open(`${BaseURL}/generate-worker-report?date=${formattedDate}&group=${groupPicker}`);
    }
  };

  const filteredData = fetchedData?.filter((worker: AttendanceWorkerType) =>
    nameFilter ? worker.employee_id.toString() === nameFilter : true
  );

  if (isLoading || LoadGroup) return <div>Loading</div>;
  const isDataAvailable = fetchedData && (groupPicker || dateFilter);

  const OptionsGroup = dataGroup?.map((group: GroupType) => ({
    value: group.id.toString(),
    label: group.name,
  }));
  const OptionsNames = workerOptions?.map((worker: any) => ({
    value: worker.id.toString(),
    label: worker.name,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <DatePickerInput
          className="max-w-sm"
          label="Pilih Tanggal"
          placeholder="Pilih Tanggal Untuk Memunculkan data"
          value={dateFilter}
          onChange={setDateFilter}
        />
        <Select
          className="max-w-sm"
          label="Pilih Kelas"
          placeholder="Semua Kelas"
          data={OptionsGroup}
          value={groupPicker}
          onChange={(e) => setGroupPicker(e || undefined)}
        />
        <Select
          className="max-w-sm"
          label="Pilih Siswa"
          placeholder="Semua Siswa"
          data={OptionsNames}
          value={nameFilter}
          onChange={(e) => setNameFilter(e || undefined)}
        />
        {filteredData?.length < 1 ? (
          <div className="text-red-500 text-xs">Tidak Ada data yang bisa Diprint</div>
        ) : (
          <div className="flex flex-col">
            {!groupPicker && <i className="text-xxs">*Pilih Kelas Agar tombol aktif</i>}
            <Button onClick={handleGetReport} disabled={!groupPicker}>
              Download PDF
            </Button>
          </div>
        )}
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
            <Table.Th className="font-bold">Keterangan</Table.Th>
            <Table.Th className="font-bold">Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {isDataAvailable && (
          <Table.Tbody>
            {fetchedData?.map((worker: AttendanceWorkerType, index: number) => (
              <Table.Tr key={index}>
                <Table.Td style={{ width: 70, textAlign: 'center' }}>{index + 1}</Table.Td>
                <Table.Td>{worker?.employee.name}</Table.Td>
                <Table.Td>{worker?.group_name}</Table.Td>
                <Table.Td>{worker?.session_name}</Table.Td>
                <Table.Td>{worker?.detail || 'Tidak ada keterangan'}</Table.Td>
                <Table.Td>
                  <Badge
                    size="sm"
                    className="uppercase"
                    style={{
                      borderRadius: '2px',
                    }}
                    color={
                      worker.attendance_status === 'H'
                        ? 'green'
                        : worker.attendance_status === 'A'
                          ? 'red'
                          : 'yellow'
                    }
                  >
                    {worker.attendance_status === 'H'
                      ? 'Hadir'
                      : worker.attendance_status === 'A'
                        ? 'Absen'
                        : 'Izin'}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        )}
      </Table>
    </div>
  );
};
