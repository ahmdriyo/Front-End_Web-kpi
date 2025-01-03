import { ActionIcon, Button, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteWorker } from '@/admin_features/employees/api';
import { WorkersType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetWorkers } from '../../api';

export const TableFreelancer: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('./login');

  const [opened, { open, close }] = useDisclosure(false);
  const [workerPick, setWorkerPick] = useState<WorkersType>();
  const deleteWorker = useDeleteWorker();

  const { data, isLoading, isError, refetch } = useGetWorkers(creds?.company_id || 0);
  const openDeleteModal = (worker: WorkersType) => {
    setWorkerPick(worker);
    setTimeout(() => {
      open();
    }, 100);
  };

  const ConfirmDelete = async (id: number) => {
    await deleteWorker.mutateAsync(id, {
      onSuccess: () => {
        notifications.show({
          title: 'Berhasil',
          message: 'Siswa Berhasil Di Non-Aktifkan',
          color: 'teal',
        });
        refetch();
        close();
      },
    });
  };

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  return (
    <div>
      {data?.length < 1 ? (
        <div className="h-80 flex justify-center items-center">Data Siswa Tidak Ditemukan</div>
      ) : (
        <Table withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
                No
              </Table.Th>
              <Table.Th className="font-bold">Nama Siswa</Table.Th>
              <Table.Th className="font-bold">No Siswa</Table.Th>
              <Table.Th className="font-bold">Status</Table.Th>
              <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.length < 1 ? (
              <div></div>
            ) : (
              <>
                {data?.map((worker: WorkersType, index: number) => (
                  <Table.Tr key={index}>
                    <Table.Td style={{ width: 70, textAlign: 'center' }}>{index + 1}</Table.Td>
                    <Table.Td>{worker?.name}</Table.Td>
                    <Table.Td>{worker?.nip}</Table.Td>
                    <Table.Td>{worker?.status == 2 ? 'Aktif' : 'Non - Aktif'}</Table.Td>
                    <Table.Td className="flex gap-2 items-center justify-center">
                      {worker?.status == 2 ? (
                        <Button
                          onClick={() => openDeleteModal(worker)}
                          size="xs"
                          color="red"
                          leftSection={<IconTrash size={14} />}
                        >
                          Non-Aktifkan
                        </Button>
                      ) : (
                        '-'
                      )}
                      {/* <ActionIcon onClick={() => openDeleteModal(worker)} color="red">
                        <IconTrash size={14} />
                      </ActionIcon> */}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </>
            )}
          </Table.Tbody>
        </Table>
      )}

      {/* Delete Employee */}
      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<span className="font-bold">Konfirmasi Non-Aktif ?</span>}
      >
        <div>
          <span>Yakin non-aktifkan siswa dengan nama </span>
          <span className="font-semibold text-blue-600"> {workerPick?.name} </span>
          <br></br>
          <span>Siswa yang non-aktif tidak dapat diaktifkan kembali </span>
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          <Button onClick={() => ConfirmDelete(workerPick?.id ?? 0)}>Yakin</Button>

          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </div>
  );
};
