import { Button, Divider, NumberInput, Select, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmployeeType, GroupSessionsType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetWorker, useGetQuranSurah, useCreateEvaluationQuran } from '../api';
import { GroupType, QuranSurah } from '../types';

type ListMemorizeProps = {
  group: GroupType;
  session: GroupSessionsType;
};

export const ListMemorize: React.FC<ListMemorizeProps> = ({ group, session }) => {
  const { creds } = useAuth();
  const [students, setStudent] = useState<EmployeeType[]>([]);
  const { data: DataWorker } = useGetWorker(group.id);
  const { data: DataSurah } = useGetQuranSurah();
  const navigate = useNavigate();

  //initiate worker
  useEffect(() => {
    if (DataWorker) {
      setStudent(DataWorker);
    }
  }, [DataWorker]);

  const listSurah = useMemo(() => {
    return (DataSurah ?? []).map((item: QuranSurah) => ({
      value: item.id.toString(),
      label: item.surah_name,
    }));
  }, [DataSurah]);

  const form = useForm({
    initialValues: {
      students: students.map((student) => ({
        employee_id: student.id,
        id_surah: 1,
        ayat: '0',
        type: 'Hafalan',
        status: 'Baik',
        employee_group_id: group.id,
        group_session_id: session.id,
        group_name: group.name,
        session_name: session.session.name,
      })),
    },
  });

  useEffect(() => {
    if (students.length > 0) {
      form.setValues({
        students: students.map((student) => ({
          employee_id: student.id,
          id_surah: 1,
          ayat: '1',
          type: 'Hafalan',
          status: 'Baik',
          employee_group_id: student.EmployeeGroups[0].id,
          group_session_id: session.id,
          group_name: group.name,
          session_name: session.session.name,
        })),
      });
    }
  }, [students]);

  const { mutateAsync } = useCreateEvaluationQuran();

  const handleSubmit = form.onSubmit(async (values: any) => {
    const dataRequest = {
      employee_input_id: creds?.employee_id,
      student: values.students,
    };
    // console.log('data1: ' + JSON.stringify(dataRequest));
    await mutateAsync(dataRequest, {
      onSuccess() {
        localStorage.setItem('hasNotifiedLaborerAttendance', 'no');
        navigate('/laborer-group/session', {
          state: {
            success: `Hafalan Quran untuk Mata Pelajaran ${session.session.name} berhasil disimpan`,
            group: group,
          },
        });
      },
    });
  });

  return (
    <section className="bg-white max-w-xs mx-auto p-3 mt-2 mb-8 shadow-md rounded-lg flex flex-col">
      <div className="flex justify-between items-center text-blue-700 mb-1 px-2 py-1">
        <div className="flex items-center">
          <Text fw={700} c="blue">
            Daftar Siswa
          </Text>
        </div>
        <span className="font-semibold">
          <IconUser />
        </span>
      </div>
      <Divider size={'sm'} />
      {form.values.students.length > 0 ? (
        <form onSubmit={handleSubmit}>
          {form.values.students.map((student, index) => (
            <div className="p-2 mb-1 mt-2" key={index}>
              <div className="my-auto text-left">
                <Text lineClamp={1} size={'sm'} fw={800}>
                  {students.find((w) => w.id === student.employee_id)?.name || 'Unknown'}
                </Text>
              </div>
              <Divider className="w-full mt-1 mb-1" />
              <div className="grid grid-cols-12 text-left mb-4 gap-2">
                <div className="col-span-12">
                  <Select
                    label="Surah"
                    placeholder="Pilih surah"
                    data={listSurah}
                    value={form.values.students[index].id_surah.toString()}
                    onChange={(value) => {
                      form.setFieldValue(`students.${index}.id_surah`, Number(value));
                    }}
                    // {...form.getInputProps(`students.${index}.surah`)}
                    searchable
                  />
                </div>
                <div className="col-span-6">
                  <TextInput
                    label="Ayat"
                    placeholder="1-10"
                    {...form.getInputProps(`students.${index}.ayat`)}
                  />
                </div>
                <div className="col-span-6">
                  <Select
                    label="Tipe"
                    placeholder="Pilih tipe"
                    data={['Hafalan', 'Murojaah']}
                    {...form.getInputProps(`students.${index}.type`)}
                  />
                </div>
                <div className="col-span-12">
                  <Select
                    label="Status"
                    placeholder="Pilih status"
                    data={['Sangat Baik', 'Baik', 'Butuh Bimbingan']}
                    {...form.getInputProps(`students.${index}.status`)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div>
            <Button fullWidth type="submit">
              Simpan penilaian
            </Button>
          </div>
        </form>
      ) : (
        <div className="w-full col-span-12">
          <section className="min-h-96 flex flex-col items-center justify-center -mt-10 -mb-15">
            <img
              className="w-28 mb-2 bg-slate-200 rounded-full p-2"
              src="/images/blank-canvas.svg"
              alt=""
            />
            <span className="font-bold text-slate-400 text-base">Belum ada data siswa</span>
          </section>
        </div>
      )}
    </section>
  );
};
