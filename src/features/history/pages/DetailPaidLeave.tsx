import { Badge, Divider, Image, Text } from '@mantine/core';
import { IconChevronLeft, IconClipboardText } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { formatterDate, getDaysBetweenDates } from '../api';
import { AbsenceType } from '../types';

export const DetailPaidLeave: React.FC = () => {
  const location = useLocation();
  const dataPaidLeave = location.state.dataPaidLeave as AbsenceType;
  const navigate = useNavigate();
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-blue-700 gap-3">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Detail {dataPaidLeave.type}</h2>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
          <span style={{ fontSize: '14px' }} className="font-bold text-blue-700 capitalize">
            {dataPaidLeave?.type}
          </span>
          <div className="-mt-2">
            <Badge
              size="xs"
              style={{
                marginLeft: '4px',
                borderRadius: '2px',
              }}
              color={dataPaidLeave?.status == 'Disetujui' ? 'blue' : 'red'}
            >
              {dataPaidLeave?.status}
            </Badge>
          </div>
        </div>
        <Divider my="sm" />
        <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4 -mt-2">
          <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
            <div className="col-span-2 text-center m-auto">
              <Text size="50px" fw={700}>
                {getDaysBetweenDates(dataPaidLeave?.date_start, dataPaidLeave?.date_end) + 1}
              </Text>
              <Text style={{ marginTop: '-5px' }} size="md">
                Hari
              </Text>
            </div>
            <div className="col-span-10 ms-2 text-left mb-2">
              <div className="ms-2 -mb-2">
                <Text size="sm" fw={700}>
                  Tanggal mulai :
                </Text>
                <Text size="sm">
                  {dataPaidLeave != null
                    ? formatterDate(dataPaidLeave?.date_start, 'EEEE, dd MMMM yyyy')
                    : '-- --'}
                </Text>
              </div>

              <Divider my="sm" />
              <div className="ms-2 -mt-2">
                <Text size="sm" fw={700}>
                  Tanggal selesai :
                </Text>
                <Text size="sm">
                  {dataPaidLeave != null
                    ? formatterDate(dataPaidLeave?.date_end, 'EEEE, dd MMMM yyyy')
                    : '-- -- '}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
          <span style={{ fontSize: '14px' }} className="font-bold text-blue-700">
            Lampiran dan keterangan
          </span>
          <IconClipboardText className="opacity-80" size={20} />
        </div>
        <Divider my="sm" />
        <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4 -mt-2">
          <div className="gap-2 mt-0">
            <Text size="sm" fw={700}>
              Lampiran :
            </Text>
            <Image
              radius="md"
              h={200}
              style={{
                justifyContent: 'center',
                padding: '10',
                marginTop: '-20px',
                width: '90% ',
              }}
              fit="contain"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
            />
          </div>
          <div className="gap-2 -mt-2">
            <Text size="sm" fw={700}>
              Keterangan :{' '}
            </Text>
            <Text size="sm">{dataPaidLeave.description}</Text>
          </div>
        </div>
      </section>
    </main>
  );
};
