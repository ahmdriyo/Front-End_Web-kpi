import { Button, Drawer, Fieldset, Select, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconAdjustmentsHorizontal,
  IconChevronLeft,
  IconFileTime,
  IconHandStop,
  IconLuggage,
  IconPlus,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { LateRequestList } from '../components';

export const LateRequest: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectStatus, setSelectStatus] = useState('Belum disetujui');
  const navigate = useNavigate();

  // [SET LOCALSTORAGE STATUS CHECKIN]
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(() => {
    const savedState = localStorage.getItem('isCheckedIn');
    return savedState ? JSON.parse(savedState) : false;
  });
  useEffect(() => {
    localStorage.setItem('isCheckedIn', JSON.stringify(isCheckedIn));
  }, [isCheckedIn]);
  // [END SET LOCALSTORAGE]

  // [NOTIFICATION 🔔]
  const { state } = useLocation();
  useEffect(() => {
    const hasNotified = localStorage.getItem('hasNotified');
    if (state?.success && hasNotified != 'yes') {
      Swal.fire({
        width: '80%',
        title: state.success,
        timer: 3000,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      localStorage.setItem('hasNotified', 'yes');
      setIsCheckedIn(true);
    }
  }, [state, navigate]);
  // [END NOTIFICATION 🔔]
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-1">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Pengajuan absensi</h2>
          </div>
          <span className="font-semibold">
            <Button
              className="shadow-sm me-1"
              size="xs"
              onClick={() => {
                navigate('/late-request/add');
              }}
            >
              <IconPlus className=" -ms-1" />
            </Button>
            <Button className="shadow-sm" size="xs" onClick={open}>
              <IconAdjustmentsHorizontal className=" -ms-1" />
            </Button>
          </span>
        </div>
      </section>

      <LateRequestList status={selectStatus} filterState={opened} />

      <Drawer
        position="right"
        offset={3}
        size="80%"
        radius="sm"
        opened={opened}
        onClose={close}
        title="Filter"
      >
        <div>
          <Fieldset className="mb-2" legend="Status">
            <Select
              className="-m-3"
              placeholder="Pilih Shift"
              data={['Disetujui', 'Ditolak', 'Belum disetujui']}
              searchValue={selectStatus}
              onSearchChange={setSelectStatus}
              allowDeselect
            />
          </Fieldset>
        </div>
        <div className="text-right mt-3">
          <Button onClick={close} style={{ width: '160px' }}>
            Cari
          </Button>
        </div>
      </Drawer>
    </main>
  );
};
