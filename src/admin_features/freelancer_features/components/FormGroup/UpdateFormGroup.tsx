import { Button, MultiSelect, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GroupType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetSession, GroupFormType, useGetWorkers } from '../../api';

interface UpdateFormGroupProps {
  onsubmit: (data: GroupFormType) => void;
  updateGroup?: GroupType; // Prop for the current group data
}

export const UpdateFormGroup: React.FC<UpdateFormGroupProps> = ({ onsubmit, updateGroup }) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('/login');

  const {
    data: workers,
    isLoading: LoadWorkers,
    isError: ErWorkers,
  } = useGetWorkers(creds?.company_id || 0, undefined, 2, true);

  // Initialize form with existing group data if available
  const form = useForm({
    initialValues: {
      name: updateGroup?.name || '',
      details: updateGroup?.details || '',
      session: updateGroup?.GroupSessions?.map((s) => s.session_id.toString()) || [],
      worker: updateGroup?.EmployeeGroups?.map((w) => w.employee_id.toString()) || [],
    },
  });

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Map form values to the required data structure
    const data: GroupFormType = {
      id: updateGroup?.id, // include the group ID for the update
      name: form.values.name,
      company_id: creds?.company_id || 0,
      details: form.values.details,
      session: form.values.session.map((session: string) => ({
        session_id: parseInt(session),
      })),
      worker: form.values.worker.map((worker: string) => ({
        employee_id: parseInt(worker),
      })),
    };

    onsubmit(data);
  };

  // Fetch sessions data
  const {
    data: dataSession,
    isLoading: LoadSession,
    isError: ErSession,
  } = useGetSession(creds?.company_id || 0);

  if (LoadSession || LoadWorkers) return <div>Loading...</div>;
  if (ErSession || ErWorkers)
    return (
      <div className="h-64 flex justify-center items-center">
        Error...
        <br /> Pastikan sudah Mengisi Data Mata Pelajaran Dan Siswa
      </div>
    );

  const OptionsSession = dataSession?.map((session: any) => ({
    value: session.id.toString(),
    label: session.name,
  }));

  const freeWorkers = workers?.map((worker: any) => ({
    value: worker.id.toString(),
    label: worker.name,
  }));

  const assignedWorkers = updateGroup?.EmployeeGroups?.map((worker: any) => ({
    value: worker.employee_id.toString(),
    label: worker.employee.name,
  }));

  const combinedWorkers = [...(freeWorkers || []), ...(assignedWorkers || [])];

  // Remove duplicates by value
  const uniqueWorkers = Array.from(
    new Map(combinedWorkers.map((worker) => [worker.value, worker])).values()
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="mb-3"
        label="Nama Kelas"
        placeholder="Nama Kelas"
        required
        {...form.getInputProps('name')}
      />

      <TextInput
        className="mb-3"
        label="Details"
        placeholder="Detail Kelas"
        required
        {...form.getInputProps('details')}
      />

      <MultiSelect
        label="Pilih Siswa"
        className="mb-3"
        placeholder="Pilih Siswa"
        data={uniqueWorkers}
        required
        {...form.getInputProps('worker')}
      />

      <MultiSelect
        className="mb-5"
        label="Pilih Mata Pelajaran atau Kegiatan"
        placeholder="Pilih Mata Pelajaran / Kegiatan"
        data={OptionsSession}
        required
        {...form.getInputProps('session')}
      />

      <div className="mt-10">
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
};
