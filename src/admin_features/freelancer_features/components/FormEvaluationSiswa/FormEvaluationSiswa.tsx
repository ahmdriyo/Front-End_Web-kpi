// src/components/FormEvaluationSiswa.tsx
import { Button, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { surahOptions } from '@/utils/surahOptions';

import {
  addEvaluationQuran,
  updateWorkerAttendance,
} from '../../api/evaluation_hafalan_api_feature';

export const FormEvaluationSiswa: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dataNilai = location.state?.data;

  useEffect(() => {
    if (!dataNilai) {
      navigate('/evaluation');
    }
  }, [dataNilai, navigate]);

  const form = useForm({
    initialValues: {
      nama_siswa: dataNilai?.employee?.name || 'Tidak diketahui',
      tanggal: dataNilai?.date ? format(new Date(dataNilai.date), 'yyyy-MM-dd') : 'Tidak diketahui',
      nama_surah: dataNilai.evaluation_quran?.nama_surah || '',
      type: dataNilai.evaluation_quran?.type || '',
      ayat: dataNilai.evaluation_quran.ayat || '',
      status: dataNilai.evaluation_quran.status || '',
    },
    validate: {
      nama_surah: (value) => (value ? null : 'Nama surah tidak boleh kosong'),
      type: (value) => (value ? null : 'Jenis hafalan tidak boleh kosong'),
      ayat: (value) => (value ? null : 'Ayat tidak boleh kosong'),
      status: (value) => (value ? null : 'Status tidak boleh kosong'),
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      const newEvaluationQuran = await addEvaluationQuran({
        ayat: values.ayat,
        type: values.type,
        nama_surah: values.nama_surah,
        status: values.status,
        worker_attendance_id: dataNilai?.id,
      });
      await updateWorkerAttendance(dataNilai?.id, {
        evaluation_quran_id: newEvaluationQuran.data.id,
      });
      navigate('/evaluation');
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Nama Siswa"
        placeholder="Nama siswa"
        value={form.values.nama_siswa}
        readOnly
      />
      <TextInput
        label="Tanggal"
        placeholder="Tanggal evaluasi"
        value={form.values.tanggal}
        readOnly
      />
      <Select
        label="Nama Surah"
        placeholder="Masukkan nama surah"
        data={surahOptions}
        {...form.getInputProps('nama_surah')}
      />
      <Select
        label="Jenis Hafalan"
        placeholder="Pilih jenis hafalan"
        data={[
          { value: 'Murojaah', label: 'Murojaah' },
          { value: 'Hafalan', label: 'Hafalan' },
        ]}
        {...form.getInputProps('type')}
      />
      <TextInput label="Ayat" placeholder="Masukkan ayat" {...form.getInputProps('ayat')} />
      <Select
        label="Status"
        placeholder="Pilih status"
        data={[
          { value: 'Sangat Baik', label: 'Sangat Baik' },
          { value: 'Baik', label: 'Baik' },
          { value: 'Butuh Bimbingan', label: 'Butuh Bimbingan' },
        ]}
        {...form.getInputProps('status')}
      />
      <div className="mt-4 flex justify-end gap-2">
        <Button color="gray" onClick={() => navigate('/evaluation')}>
          Batal
        </Button>
        <Button type="submit">Simpan</Button>
      </div>
    </form>
  );
};
