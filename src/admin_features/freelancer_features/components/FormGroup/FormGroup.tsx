import { Button, MultiSelect, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetSession, GroupFormType, useGetWorkers } from '../../api';

interface FormGroupProps {
  onsubmit: (data: GroupFormType) => void;
}
export const FormGroup: React.FC<FormGroupProps> = ({ onsubmit }) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('/login');

  const {
    data: workers,
    isLoading: LoadWorkers,
    isError: ErWorkers,
  } = useGetWorkers(creds?.company_id || 0, undefined, 2, true);

  // Use Form Group
  const form = useForm({
    initialValues: {
      name: '',
      details: '',
      session: [],
      worker: [],
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Maping Data
    const data: GroupFormType = {
      name: form.values.name,
      company_id: creds?.company_id || 0,
      details: form.values.details,
      session: form.values.session.map((session: string) => ({ session_id: parseInt(session) })),
      worker: form.values.worker.map((worker: string) => ({ employee_id: parseInt(worker) })),
    };
    console.log('data group:', data);

    onsubmit(data);
  };

  // Get Data Session
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
        <br /> Pastikan sudah Mengisi Data Mata Pelajaran Dan Pekerja
      </div>
    );

  const OptionsSession = dataSession?.map((session: any) => ({
    value: session.id.toString(),
    label: session.name,
  }));

  const OptionsWorkers = workers?.map((worker: any) => ({
    value: worker.id.toString(),
    label: worker.name,
  }));

  const cekNilai = () => {
    console.log('nilai :', workers);
  };

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
        label={`Details`}
        placeholder="Detail Kelas"
        required
        {...form.getInputProps(`details`)}
      />

      <MultiSelect
        label="Pilih Siswa"
        className="mb-3"
        placeholder="Pilih Siswa"
        data={OptionsWorkers}
        required
        searchable
        {...form.getInputProps('worker')}
      />

      <MultiSelect
        className="mb-5"
        label="Pilih Mata Pelajaran atau Kegiatan"
        placeholder="Pilih Mata Pelajaran / Kegiatan"
        data={OptionsSession}
        required
        searchable
        {...form.getInputProps('session')}
      />
      <div className="mt-10">
        <Button type="submit" onClick={() => cekNilai}>
          Simpan
        </Button>
      </div>
      {/* <div className="mt-10">
        <Button onClick={() => cekNilai()}>Simpanjj</Button>
      </div> */}
    </form>
  );
};
