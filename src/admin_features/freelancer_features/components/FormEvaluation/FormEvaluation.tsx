import { Button, MultiSelect, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetSession, useGetGroup, useGetEvaluationWorkers, EvaluationFormType } from '../../api';

interface FormEvaluationProps {
  onsubmit: (data: EvaluationFormType) => void;
}

export const FormEvaluation: React.FC<FormEvaluationProps> = ({ onsubmit }) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('/login');
  // const { mutate: postEvaluation } = usePostEvaluation();

  const {
    data: workers,
    isLoading: LoadWorkers,
    isError: ErWorkers,
  } = useGetEvaluationWorkers(creds?.company_id || 0, 2);

  const {
    data: groups,
    isLoading: LoadGroups,
    isError: ErGroups,
  } = useGetGroup(creds?.company_id || 0);

  const {
    data: dataSession,
    isLoading: LoadSession,
    isError: ErSession,
  } = useGetSession(creds?.company_id || 0);

  const form = useForm({
    initialValues: {
      name: '',
      group: [],
      session: '',
      worker: [],
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: EvaluationFormType = {
      name: form.values.name,
      group: form.values.group,
      company_id: creds?.company_id || 0,
      session: [{ session_id: parseInt(form.values.session) }],
      worker: form.values.worker.map((worker: string) => ({ employee_id: parseInt(worker) })),
    };
    try {
      onsubmit(data);
      // console.log('ini data :',data);
      // alert('berhasil');
      // await postEvaluation(data);
    } catch (error) {
      console.error('Failed to save evaluation:', error);
    }
  };

  if (LoadSession || LoadWorkers || LoadGroups) return <div>Loading...</div>;
  if (ErSession || ErWorkers || ErGroups)
    return (
      <div className="h-64 flex justify-center items-center">
        Error...
        <br /> Pastikan sudah Mengisi Data Sesi, Pekerja, dan Kelompok
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

  const OptionsGroups = groups?.map((group: any) => ({
    value: group.name,
    label: group.name,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Select
        className="mb-3"
        label="Nama Sesi"
        placeholder="Nama Sesi"
        data={OptionsSession}
        required
        {...form.getInputProps('session')}
      />

      <Select
        className="mb-3"
        label="Nama Kelompok"
        placeholder="Nama Kelompok"
        data={OptionsGroups}
        required
        {...form.getInputProps('name')}
      />

      <MultiSelect
        label="Anggota"
        className="mb-3"
        placeholder="Anggota"
        data={OptionsWorkers}
        required
        {...form.getInputProps('worker')}
      />
      <div className="mt-10">
        <Button type="submit">Simpan</Button>
      </div>
    </form>
  );
};
