/* eslint-disable linebreak-style */
import { ActionIcon, Button, CopyButton, Loader, Modal, Radio, Select, Table } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconClipboardText,
  IconCopy,
  IconInfoCircle,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SchedulesType, EditScheduleItemType } from '@/admin_features/schedule/types';
import { useGetShift } from '@/admin_features/shift/api';
import { ShiftType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
import { formatDateToString, getDaysInMonths, getStartAndEndOfMonth } from '@/utils/format';

import { useDeleteScheduleEmployee, useEditFreeDay } from '../../api';
import { useGetSchedule } from '../../api/getSchedule';
import { DataPasteScheduleMonth, usePasteMonthSchedule } from '../../api/pasteMonthSchedule';
import { DataPasteSchedule, usePasteSchedule } from '../../api/pasteSchedule';

type TableScheduleProps = {
  month: Date;
  setMonth: (month: Date) => void;
  setIsSchedule: (value: boolean) => void;
};

export const TableSchedule: React.FC<TableScheduleProps> = ({ month, setMonth, setIsSchedule }) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  // Data Master Schedule
  const [dataSchedule, setDataSchedule] = useState<SchedulesType[]>([]);
  const {
    data,
    isLoading: loadingSchedule,
    isError: errorSchedule,
    refetch,
  } = useGetSchedule(month.getMonth() + 1, month.getFullYear(), creds?.company_id);
  const DayinMonth = getDaysInMonths(month.getMonth(), month.getFullYear());
  const { data: dataShift, isLoading: loadingGetShift } = useGetShift(creds?.company_id);
  const location = useLocation();
  // State Process Paste
  const [ProcessPaste, setProcessPaste] = useState(false);

  // Edit Data
  const [opened, modal] = useDisclosure(false);
  const [FreeDays, setFreeDay] = useState(false);
  const [DataEditFreeDay, setDataEditFreeDay] = useState<EditScheduleItemType[]>([]);
  const MutationEditItemSchedule = useEditFreeDay();

  // State For Copy Data Schedule
  const [DataCopySchedule, setDataCopySchedule] = useState<SchedulesType>();
  const MutationPaste = usePasteSchedule();
  const MutationPasteMonth = usePasteMonthSchedule();
  const [MonthCopyDataSchedule, setMonthCopyDataSchedule] = useState<SchedulesType[]>([]);

  // Delete Data Schedule
  const MutationDeleteEmployeeSchedule = useDeleteScheduleEmployee();

  // Get Month Location
  const monthLocation =
    new URLSearchParams(location.search).get('month') ?? formatDateToString(new Date().toString());

  // Use State Untuk Mengganti Shift atau default Libur
  const form = useForm({
    initialValues: {
      value_edit: 'libur',
      value_place: 'WFO',
    },
  });

  // Update Data Schedule When Data Schedule Change
  useEffect(() => {
    if (data) {
      setDataSchedule(data.data);
      if (data.data.length > 0) {
        setIsSchedule(true);
      } else {
        setIsSchedule(false);
      }
    }
  }, [data, dataShift, setIsSchedule]);

  // [START] Copy Data Schedule
  const SaveCopySchedule = (index: number) => {
    setDataCopySchedule(dataSchedule[index]);
  };

  const PasteDataSchedule = (index: number) => {
    const DataPaste: DataPasteSchedule = {
      beforeDataSchedule: DataCopySchedule,
      afterDataSchedule: dataSchedule[index],
    };

    MutationPaste.mutateAsync(DataPaste, {
      onSuccess: () => {
        refetch();
        notifications.show({
          message: 'Berhasil Menyalin Jadwal',
          color: 'green',
        });
      },
      onError: () => {
        notifications.show({
          message: 'Gagal Menyalin Jadwal',
          color: 'red',
        });
      },
    });
  };

  const handlePasteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessPaste(true);
    const { startOfMonth, endOfMonth } = getStartAndEndOfMonth(monthLocation);

    const DataPasteMonth: DataPasteScheduleMonth = {
      DataScheduleOld: MonthCopyDataSchedule,
      month: month.getMonth() + 1,
      year: month.getFullYear(),
      default_shift: dataShift.data[0].id,
      date_start: formatDateToString(startOfMonth.toString()),
      date_end: formatDateToString(endOfMonth.toString()),
    };

    await MutationPasteMonth.mutateAsync(DataPasteMonth, {
      onSuccess: () => {
        setTimeout(() => {
          refetch();
          setProcessPaste(false);
          notifications.show({
            message: 'Berhasil Menyalin Jadwal',
            color: 'green',
          });
        }, 3000);
      },
    });
  };
  // [END] Copy Data Schedule

  //[START] Simpan Data Edit Libur
  //  => Update State Data Edit FreeDay
  const EditFreeDays = async (newFreeDay: EditScheduleItemType) => {
    const newEditLibur = [...DataEditFreeDay];
    const index = newEditLibur.findIndex((item) => item.schedule_id === newFreeDay.schedule_id);
    if (index === -1) {
      setDataEditFreeDay((prev) => prev.concat(newFreeDay));
    } else {
      setDataEditFreeDay((prev) =>
        prev.filter((item) => item.schedule_id !== newFreeDay.schedule_id)
      );
    }
  };

  //  => Handle Form Value (MAPING DATA FOR REQUEST BODY TO API)
  const HandleFormValue = () => {
    if (form.values.value_edit != 'libur') {
      const new_data_edit: EditScheduleItemType[] = DataEditFreeDay.map((data_edit) => {
        return {
          schedule_id: data_edit.schedule_id,
          status: 'on',
          shift_id: parseInt(form.values.value_edit),
          default_place: form.values.value_place,
        };
      });

      return new_data_edit;
    } else {
      const new_data_edit: EditScheduleItemType[] = DataEditFreeDay.map((data_edit) => {
        return {
          schedule_id: data_edit.schedule_id,
          status: 'off',
          shift_id: data_edit.shift_id,
          default_place: form.values.value_place,
        };
      });
      return new_data_edit;
    }
  };

  //  => Reset State Data Edit FreeDay
  const ResetDataEditItemSchedule = () => {
    refetch();
    setDataEditFreeDay([]);
    modal.close();
  };

  //  => Handle Confirm Edit Schedule (Save Data)
  const HandleConfirmEditItemSchedule = async () => {
    const data_submit = HandleFormValue();
    MutationEditItemSchedule.mutateAsync(data_submit, {
      onSuccess: () => {
        modal.close();
        refetch();
        ResetDataEditItemSchedule();
        notifications.show({
          message: 'Berhasil Mengubah Jadwal',
          color: 'green',
        });
      },
    });
  };
  //[END] Simpan Data Edit Libur

  // Delete Data Schedule from Employee
  const DeleteEmployeeSchedule = (id: number) => {
    MutationDeleteEmployeeSchedule.mutateAsync(id, {
      onError: () => {
        notifications.show({
          message: 'Gagal Menghapus Jadwal ',
          color: 'red',
        });
      },
      onSuccess: () => {
        refetch();
        notifications.show({
          message: 'Berhasil Menghapus Jadwal',
          color: 'green',
        });
      },
    });
  };

  // Loading Data
  if (loadingGetShift || loadingSchedule) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }

  if (errorSchedule) {
    return <div className="text-red-600 text-center my-20 font-bold">Gagal Mengambil Data</div>;
  }

  const OptionDataShiftSelection = dataShift.data.map((shift: ShiftType) => {
    return {
      label: shift.shift_name,
      value: shift.id.toString(),
    };
  });

  const ShowScheduleCell = (scheduleItem: EditScheduleItemType) => {
    if (scheduleItem.checked) {
      return { className: 'bg-blue-600 text-white', value: <IconCheck size={10} /> };
    } else if (scheduleItem.status == 'off') {
      return { className: 'bg-red-600 text-white', value: '-' };
    } else {
      return { className: '', value: scheduleItem.shift_id };
    }
  };

  // RENDER COMPONENT ==============================================================================================

  return (
    <section className="bg-white rounded-lg shadow-lg p-3">
      <div className="mb-3 flex gap-2 justify-between flex-wrap">
        <form action="">
          <MonthPickerInput
            className="w-56"
            placeholder="Pilih Bulan"
            value={month}
            onChange={(value) => {
              setDataCopySchedule(undefined);
              if (value === null) {
                setMonth(monthLocation ? new Date(monthLocation) : new Date());
              } else {
                setMonth(value);
              }
            }}
          ></MonthPickerInput>
        </form>
        {dataSchedule.length > 0 ? (
          <div className="flex gap-2">
            <CopyButton value="KPI">
              {({ copied, copy }) => (
                <Button
                  color={copied ? 'yellow' : 'green'}
                  leftSection={<IconCopy size={15}></IconCopy>}
                  onClick={() => {
                    copy();
                    setMonthCopyDataSchedule(dataSchedule);
                  }}
                >
                  Copy Jadwal
                </Button>
              )}
            </CopyButton>
            <Button
              onClick={() => {
                setFreeDay(!FreeDays);
                setDataCopySchedule(undefined);
                if (DataEditFreeDay.length > 0 && FreeDays) {
                  modal.open();
                }
              }}
              style={{ zIndex: FreeDays ? 9999 : 1, position: 'relative' }}
              leftSection={<IconSettings size={15} />}
            >
              {FreeDays ? 'Simpan' : 'Edit Jadwal'}
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>

      {/* Informasi Shift */}
      <div className="flex mb-2 text-xs gap-2">
        <div className="text-xs flex gap-1 text-yellow-600">
          <IconInfoCircle size={16} /> Info Shift :
        </div>
        {dataShift.data.map((shift: ShiftType) => (
          <div className="border border-slate-400 rounded-md px-2" key={shift.id}>
            <span className="text-center font-bold">{shift.id}</span>
            <span className="w-5 text-center"> : </span>
            <span className="w-10">{shift.shift_name}</span>
            <span className="pl-2 text-blue-500">{shift.start_time + ' - ' + shift.end_time}</span>
          </div>
        ))}
      </div>

      {/* Table Jadwal */}
      <div
        className="absolute bg-black opacity-50 top-0 left-0 w-full h-screen"
        style={{ zIndex: FreeDays ? 999 : 1, display: FreeDays ? '' : 'none' }}
      ></div>
      {dataSchedule.length > 0 && (
        <div
          className="relative bg-white overflow-x-auto border border-slate-300"
          style={{ zIndex: FreeDays ? 9999 : 1 }}
        >
          <Table withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="sticky left-0 bg-gray-200 min-w-60 font-semibold">
                  <sub>Nama</sub>\<sup>Tgl</sup>
                </Table.Th>
                {DayinMonth.map((day, index) => (
                  <Table.Th key={index} className="bg-gray-200 font-semibold">
                    <div className="text-center">
                      <div className={`text-xxs ${day.dayName === 'Min' ? 'text-red-700' : ''}`}>
                        {day.dayName}
                      </div>
                      <div>{index + 1}</div>
                    </div>
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {dataSchedule.map((item: any, rowIndex: number) => (
                <Table.Tr key={rowIndex}>
                  <Table.Td className="sticky left-0 bg-gray-200">
                    <div className="w-full flex justify-between">
                      <span>{item.employee.name}</span>
                      <ActionIcon.Group>
                        {
                          // Menampilkan Tombol Copy Schedule
                          DataCopySchedule ? (
                            <ActionIcon
                              variant="default"
                              onClick={() => PasteDataSchedule(rowIndex)}
                              loading={MutationPaste.isPending}
                            >
                              <IconClipboardText size={12} />
                            </ActionIcon>
                          ) : (
                            <ActionIcon
                              variant="default"
                              onClick={() => SaveCopySchedule(rowIndex)}
                            >
                              <IconCopy size={15} />
                            </ActionIcon>
                          )
                        }
                        <ActionIcon
                          variant="default"
                          onClick={() => DeleteEmployeeSchedule(item.id)}
                        >
                          <IconTrash size={15} className="text-red-600" />
                        </ActionIcon>
                      </ActionIcon.Group>
                    </div>
                  </Table.Td>
                  {item?.Schedules.map((schedule: any, colIndex: number) => (
                    <Table.Td
                      key={colIndex}
                      onClick={() => {
                        if (FreeDays) {
                          const newSchedule = [...dataSchedule];
                          newSchedule[rowIndex].Schedules[colIndex].status =
                            newSchedule[rowIndex].Schedules[colIndex].status == 'off'
                              ? 'on'
                              : 'off';
                          newSchedule[rowIndex].Schedules[colIndex].checked =
                            newSchedule[rowIndex].Schedules[colIndex].checked == true
                              ? false
                              : true;
                          setDataSchedule(newSchedule);

                          //   Menyimpan Data Untuk Direquest
                          const newFreeDay: EditScheduleItemType = {
                            schedule_id: newSchedule[rowIndex].Schedules[colIndex].id,
                            status: newSchedule[rowIndex].Schedules[colIndex].status,
                            shift_id: newSchedule[rowIndex].Schedules[colIndex].shift_id,
                            default_place:
                              newSchedule[rowIndex].Schedules[colIndex].attendance_place,
                          };
                          EditFreeDays(newFreeDay);
                        }
                      }}
                      className={`cursor-pointer text-center ${ShowScheduleCell(schedule).className}`}
                    >
                      {schedule?.shift.shift_code}
                      {schedule.status === 'on' && (
                        <div className="text-xxs -mt-2 text-slate-400">
                          {schedule.attendance_place === 'WFH' && 'WFH'}
                        </div>
                      )}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          {/* Modal Konfirmasi Edit Schedule */}
          <Modal
            opened={opened}
            onClose={() => {
              modal.close();
              ResetDataEditItemSchedule();
              refetch();
            }}
            title={<span className="font-semibold text-sm">Konfirmasi Edit Jadwal ?</span>}
            withCloseButton={false}
          >
            <div>
              <div>
                <span>Pilih Ganti </span>
                <Select
                  allowDeselect={false}
                  data={[...OptionDataShiftSelection, { value: 'libur', label: 'Libur' }]}
                  value={form.values.value_edit}
                  {...form.getInputProps('value_edit')}
                />
                <Radio.Group name="attendance_place" {...form.getInputProps('value_place')}>
                  <div className="flex gap-4 mt-3">
                    <Radio defaultChecked value={'WFO'} label="WFO" />
                    <Radio value={'WFH'} label="WFH" />
                  </div>
                </Radio.Group>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <Button
                  onClick={() => {
                    HandleConfirmEditItemSchedule();
                  }}
                  loading={MutationEditItemSchedule.isPending}
                >
                  Ya
                </Button>
                <Button onClick={ResetDataEditItemSchedule} color="red">
                  Tidak
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {dataSchedule.length === 0 && !ProcessPaste ? (
        <div className="text-center text-slate-400 my-20">
          <div className="mb-2">
            <span className="font-semibold">Tidak ada jadwal yang tersedia</span> <br />
            <span className="text-blue-500 text-xs">
              Silahkan Buat atau Copy dari jadwal yang sudah ada
            </span>
          </div>
          {MonthCopyDataSchedule.length > 0 && (
            <form onSubmit={handlePasteSubmit}>
              <Button
                loading={MutationPasteMonth.isPending}
                type="submit"
                leftSection={<IconClipboardText size={15} />}
              >
                Paste
              </Button>
            </form>
          )}
        </div>
      ) : (
        <div>
          {ProcessPaste && (
            <div className="flex justify-center items-center w-full h-72">
              <div>
                <div className="flex justify-center">
                  <Loader />
                </div>
                <div className="text-center text-sm text-slate-400 mt-2">
                  Sedang memproses data, mohon tunggu sebentar...
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
