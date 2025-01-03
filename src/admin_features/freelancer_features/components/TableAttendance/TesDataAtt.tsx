import { Loader, Alert, Container, Text, Title, Card, Badge, Divider } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { IconAlertCircle } from '@tabler/icons-react';
import axios from 'axios';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';

import storage from '@/utils/storage';
interface Employee {
  nip: string;
  name: string;
}

interface AttendanceItem {
  id: number;
  date: string;
  attendance_status: string;
  detail: string;
  employee: Employee;
  session_name: string;
}

export const TesDataAtt: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceData, setAttendanceData] = useState<AttendanceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const url = import.meta.env.VITE_API_URL;

  const fetchAttendanceData = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      // conwwst formattedDate = format(date, 'yyyy-MM-dd');
      const response = await axios.get(`${url}/worker-attendance?company=12`, {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
      });
      console.log('data response', response);
      if (response.data.data && response.data.data.length > 0) {
        setAttendanceData(response.data.data);
      } else {
        setAttendanceData([]);
      }
    } catch (err) {
      console.error('Error fetching attendance data:', err);
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (selectedDate) {
    //   fetchAttendanceData(selectedDate);
    // }
    fetchAttendanceData();
  }, []);

  return (
    <Container>
      <Title order={2} mb="lg">
        Kalender
      </Title>
      <Card withBorder shadow="sm" className="flex items-center justify-cente m-2">
        <Calendar
          getDayProps={(date) => ({
            selected: dayjs(date).isSame(selectedDate, 'date'),
            onClick: () => setSelectedDate(date),
          })}
        />
      </Card>
      {loading ? (
        <Card shadow="sm" padding="lg" withBorder className="m-2 mt-5">
          <div className="mt-4 flex flex-col items-center">
            <Loader size="lg" mt="lg" />
          </div>
        </Card>
      ) : error ? (
        <Alert title="Error" color="red" mt="lg">
          {error}
        </Alert>
      ) : attendanceData.length === 0 ? (
        <Card shadow="sm" padding="lg" withBorder className="m-2 mt-5">
          <div className="mt-4 flex flex-col items-center">
            <IconAlertCircle size={48} color="red" />
            <Text mt="md" size="xl" className="text-center">
              Belum Ada Data Absensi Siswa
            </Text>
            <Text mt="xs" className="text-center">
              Tidak ada data absensi untuk tanggal yang dipilih.
            </Text>
            <Badge color="red" mt="md" size="lg" variant="filled" radius="sm">
              Coba Pilih Tanggal Lain
            </Badge>
          </div>
        </Card>
      ) : (
        <Card withBorder shadow="sm" className="flex m-2">
          {selectedDate ? (
            attendanceData.length > 0 ? (
              attendanceData.map((labAtt) => (
                <div className="col-span-12 py-2" key={labAtt.id}>
                  <div className="my-auto">
                    <div className="flex justify-between mb-1">
                      <div>
                        <Text lineClamp={1} size={'sm'} fw={800}>
                          {labAtt.session_name}
                        </Text>
                      </div>
                      <Badge
                        size="sm"
                        className="uppercase"
                        style={{
                          borderRadius: '2px',
                        }}
                        color={
                          labAtt.attendance_status === 'H'
                            ? 'green'
                            : labAtt.attendance_status === 'A'
                              ? 'red'
                              : 'yellow'
                        }
                      >
                        {labAtt.attendance_status === 'H'
                          ? 'Hadir'
                          : labAtt.attendance_status === 'A'
                            ? 'Absen'
                            : 'Izin'}
                      </Badge>
                    </div>
                  </div>
                  {/* <Divider className="w-full mt-1 mb-1" /> */}
                  <div className="grid grid-cols-12 text-left mb-4">
                    <div className="col-span-6">
                      <Text size={'xs'} fw={500}>
                        Keterangan:
                      </Text>
                    </div>
                    <div className="col-span-6 ml-[-40px]">
                      <Text size={'xs'}>{labAtt.detail || 'Tidak ada keterangan'}</Text>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 text-left mb-4">
                    <div className="col-span-6">
                      <Text size={'xs'} fw={500}>
                        Tanggal
                      </Text>
                    </div>
                    <div className="col-span-6 ml-[-40px]">
                      <Text size="xs">{labAtt.date.slice(0, 10)}</Text>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Divider size={'lg'} />
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p>Tidak ada data</p>
              </div>
            )
          ) : (
            <div>
              <p>Silakan pilih tanggal terlebih dahulu</p>
            </div>
          )}
        </Card>
      )}
    </Container>
  );
};
