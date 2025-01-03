/* eslint-disable import/order */
import { Button, Divider, Input, Modal, Text } from '@mantine/core';
import { IconMailForward, IconPlus, IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useGetActivityAlias, useGetActivityDetail } from '../attendance/api/getActivity';
import {
  ActivityDetailType,
  AttendanceType,
  useGetAttendance,
  useCreateActivity,
  useGeoLocation,
} from '../attendance';
import { formatterDate } from '../history';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { EmployeeType } from '@/admin_features/types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

type ActivityProps = {
  employee: EmployeeType | undefined;
  date: Date | string | number | null;
};

export const ActivityCard: React.FC<ActivityProps> = ({ employee, date }: ActivityProps) => {
  const { creds } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState<AttendanceType>();
  const { data: DataAttendance } = useGetAttendance(
    employee?.id,
    formatterDate(date, 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (DataAttendance) {
      setAttendance(DataAttendance);
    }
  }, [DataAttendance]);

  const [params, setParams] = useState({
    company_id: employee?.user.company_id,
    employee_id: employee?.id,
    date: date,
  });
  useEffect(() => {
    const newParams = {
      company_id: employee?.user.company_id,
      employee_id: employee?.id,
      date: date,
    };
    setParams(newParams);
  }, [date, employee]);

  // [All about  Activity Alias]
  const [activityAlias, setActivityAlias] = useState([]);
  const { data: dataActivityAlias } = useGetActivityAlias(params.company_id);
  useEffect(() => {
    if (dataActivityAlias) {
      setActivityAlias(dataActivityAlias);
    }
  }, [dataActivityAlias, date, params]);
  // [End Activity Alias]
  // [All about Activity Detail]
  const [activityDetail, setActivityDetail] = useState<ActivityDetailType[]>([]);
  const { data: dataActivity, refetch: RefetchActivityDetail } = useGetActivityDetail(
    params.employee_id,
    formatterDate(params.date, 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (dataActivity) {
      setActivityDetail(dataActivity);
    }
  }, [dataActivity, date, params, employee]);
  // [End Activity Detail]

  //[Add Activity]
  const formActivity = useForm({
    validateInputOnChange: true,
    initialValues: {
      custom1: '',
      custom2: '',
      custom3: '',
      custom4: '',
      custom5: '',
      custom6: '',
      custom7: '',
      custom8: '',
      custom9: '',
      custom10: '',
    },
    validate: {
      custom1: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom2: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom3: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom4: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom5: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom6: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom7: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom8: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom9: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom10: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
    },
  });

  // [ADD KEGIATAN]
  const location = useGeoLocation();
  const mutationAddActivity = useCreateActivity();
  const handleActivity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const activityData = {
      attendance_id: attendance?.id,
      custom1: formActivity.values.custom1,
      custom2: formActivity.values.custom2,
      custom3: formActivity.values.custom3,
      custom4: formActivity.values.custom4,
      custom5: formActivity.values.custom5,
      custom6: formActivity.values.custom6,
      custom7: formActivity.values.custom7,
      custom8: formActivity.values.custom8,
      custom9: formActivity.values.custom9,
      custom10: formActivity.values.custom10,
      activity_lon: (location.coordinates?.longitude ?? 0).toString(),
      activity_lat: (location.coordinates?.latitude ?? 0).toString(),
    };

    await mutationAddActivity.mutateAsync(activityData, {
      onSuccess: (data) => {
        RefetchActivityDetail();

        close();
      },
    });
  };
  // [End add kegiatan]
  // [END ACTIVITY]
  return (
    <>
      <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-7 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="text-base font-bold text-blue-700">Kegiatan </span>
          {creds?.role == 'employee' && (
            <Button
              disabled={attendance?.check_in == null || attendance?.check_out != null}
              onClick={open}
              className="shadow-sm me-1"
              size="xs"
            >
              <IconPlus className="-ms-1" size={18} />
            </Button>
          )}
        </div>
        <Divider size={'sm'} />
        <div className="w-full p-2">
          {activityDetail.length > 0 ? (
            activityDetail.map((activity, index) => (
              <section
                key={index}
                className="bg-white mx-auto max-w-xs w-full z-50 relative p-2 px-2 text-slate-700 "
              >
                <div className="flex justify-between text-xs items-center mb-2">
                  <span className="text-sm font-bold text-blue-700">Kegiatan {index + 1}</span>
                  <Button
                    onClick={() =>
                      navigate(`/activity/detail/`, {
                        state: {
                          activity: activity,
                          alias: activityAlias[0],
                          index: index,
                        },
                      })
                    }
                    variant="transparent"
                    className="shadow-xs "
                    size="xs"
                  >
                    <IconInfoCircle size={18} />
                  </Button>
                </div>
                <div className="grid grid-cols-12 gap-x-2">
                  {activityDetail != null && activityAlias[0] != null
                    ? Array.from(
                        { length: 10 },
                        (_, i) =>
                          activityAlias[0][`cs${i + 1}_name`] != '' && (
                            <div key={i} className="mb-1 col-span-6 w-full">
                              <Text truncate="end" size="xs" fw={700}>
                                {activityAlias[0][`cs${i + 1}_name`]}
                              </Text>
                              <Text truncate="end" style={{ textAlign: 'left' }} size="xs">
                                {activity[`custom${i + 1}`]}
                              </Text>
                            </div>
                          )
                      )
                    : ''}
                </div>
                <div className="text-right mt-2 me-2">
                  <Text truncate="end" size="xs">
                    {formatterDate(new Date(activity['created_at'] ?? 0), 'HH:mm')}
                  </Text>
                </div>
                <Divider size={'xs'} className="mt-4" />
              </section>
            ))
          ) : (
            <div className="w-full col-span-12">
              <section className="min-h-96 flex flex-col items-center justify-center -mt-10 -mb-13">
                <img
                  className="w-28 mb-2 bg-slate-200 rounded-full p-2"
                  src="/images/blank-canvas.svg"
                  alt=""
                />
                <span className="font-bold text-slate-400 text-base">Belum ada data kegiatan</span>
              </section>
            </div>
          )}
        </div>
      </section>

      <Modal opened={opened} onClose={close} title="Tambah kegiatan">
        <form onSubmit={handleActivity}>
          {activityAlias[0] != null
            ? Array.from(
                { length: 10 },
                (_, i) =>
                  activityAlias[0][`cs${i + 1}_name`] != '' && (
                    <div key={i} className="mb-2">
                      <Input.Wrapper
                        label={activityAlias[0][`cs${i + 1}_name`]}
                        description=""
                        error=""
                      >
                        <Input
                          required
                          placeholder={`masukkan ${activityAlias[0][`cs${i + 1}_name`]}`}
                          {...formActivity.getInputProps(`custom${i + 1}`)}
                        />
                      </Input.Wrapper>
                    </div>
                  )
              )
            : ''}
          <div className="mb-2 mt-5">
            <Button type="submit" fullWidth rightSection={<IconMailForward size={'20px'} />}>
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
