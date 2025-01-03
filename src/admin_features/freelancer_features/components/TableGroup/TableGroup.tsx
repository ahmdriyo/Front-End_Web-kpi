import { ActionIcon, Button, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconEye, IconList, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GroupType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useUpdateGroup, useDeleteGroup, useGetGroup, GroupFormType } from '../../api';
import { UpdateFormGroup } from '../FormGroup/UpdateFormGroup';

export const TableGroup: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('./login');

  const mutateUpdate = useUpdateGroup();

  const [opened, { open, close }] = useDisclosure();
  const [deleteModal, { open: op, close: cl }] = useDisclosure();
  const [updateModal, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure();

  const [detailGroup, setDetailGroup] = useState<GroupType | undefined>(undefined);
  const [groupPicker, setGroupPicker] = useState<GroupType | undefined>(undefined);
  const [updateGroup, setUpdateGroup] = useState<GroupType | undefined>(undefined);
  const deleteGroup = useDeleteGroup();
  const updateGroupChange = (group: GroupType) => {
    setUpdateGroup(group);
    setTimeout(() => {
      openUpdateModal();
    }, 50);
  };

  const handleUpdateSubmit = async (data: GroupFormType) => {
    await mutateUpdate.mutateAsync(data, {
      onSuccess: () => {
        notifications.show({
          message: 'Berhasil Mengubah Kelas',
          color: 'blue',
        });
      },
    });
  };

  const DetailGroupChange = (group: GroupType) => {
    setDetailGroup(group);
    setTimeout(() => {
      open();
    }, 50);
  };
  const JadwalGroup = (group: GroupType) => {
    setDetailGroup(group);
    navigate(`/group/schedule`, { state: { detailGroup: group } });
  };

  const { data, isLoading, isError, refetch } = useGetGroup(creds?.company_id || 0);
  const ConfirmDelete = () => {
    if (groupPicker) {
      deleteGroup.mutateAsync(groupPicker.id, {
        onSuccess: () => {
          notifications.show({
            title: 'Berhasil',
            message: 'Data Kelas Berhasil Dihapus',
            color: 'teal',
          });
          refetch();
          cl();
        },
      });
    }
  };

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      {data?.length < 1 ? (
        <div className="h-64 flex justify-center items-center">Data Kelas tidak ditemukan</div>
      ) : (
        <Table withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
                No
              </Table.Th>
              <Table.Th className="font-bold">Nama Kelas</Table.Th>
              <Table.Th className="font-bold">Jumlah Siswa</Table.Th>
              <Table.Th className="font-bold">Jumlah Mata Pelajaran</Table.Th>
              <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.map((group: GroupType, index: number) => (
              <Table.Tr key={index}>
                <Table.Td style={{ width: 70, textAlign: 'center' }}>{index + 1}</Table.Td>
                <Table.Td>{group?.name}</Table.Td>
                <Table.Td>{group?.EmployeeGroups.length} Orang</Table.Td>
                <Table.Td>{group?.GroupSessions.length} Mata Pelajaran</Table.Td>
                <Table.Td className="flex gap-2 items-center justify-center">
                  <ActionIcon
                    onClick={() => {
                      setGroupPicker(group);
                      setTimeout(() => {
                        op();
                      }, 100);
                    }}
                    color="red"
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                  <Button
                    onClick={() => updateGroupChange(group)}
                    size="xs"
                    color="blue"
                    leftSection={<IconEye size={14} />}
                  >
                    update
                  </Button>
                  <Button
                    onClick={() => DetailGroupChange(group)}
                    size="xs"
                    color="blue"
                    leftSection={<IconEye size={14} />}
                  >
                    Detail
                  </Button>
                  {/* <Button
                    onClick={() => JadwalGroup(group)}
                    size="xs"
                    color="blue"
                    leftSection={<IconList size={14} />}
                  >
                    Info Jadwal
                  </Button> */}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}

      {/* Modal Detail Groups */}
      <Modal
        size={'lg'}
        opened={opened}
        onClose={close}
        title={<div className="font-semibold">Detail {detailGroup?.name || 'Group'}</div>}
      >
        <div>
          <div className="font-semibold flex gap-2 mb-5">
            {' '}
            <div>Nama Kelas : </div>
            {detailGroup?.name}
          </div>
          <div className="mb-5">
            <div className="font-semibold text-xs">Anggota Kelas</div>
            <table className="w-full text-sm text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300 font-semibold">No</th>
                  <th className="border border-slate-300 font-semibold">Nama Siswa</th>
                  <th className="border border-slate-300 font-semibold">Kode Pekerja</th>
                </tr>
              </thead>
              <tbody>
                {detailGroup?.EmployeeGroups.map((employee, index) => (
                  <tr key={index}>
                    <td className="border border-slate-300 p-1">{index + 1}</td>
                    <td className="border border-slate-300 p-1">{employee.employee.name}</td>
                    <td className="border border-slate-300 p-1">{employee.employee.nip || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="font-semibold text-xs">Mata Pelajaran Kerja</div>
            <table className="w-full text-sm text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300 font-semibold">No</th>
                  <th className="border border-slate-300 font-semibold">Nama Mata Pelajaran</th>
                </tr>
              </thead>
              <tbody>
                {detailGroup?.GroupSessions.map((session, index) => (
                  <tr key={index}>
                    <td className="border border-slate-300 p-1">{index + 1}</td>
                    <td className="border border-slate-300 p-1">{session.session.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <Button color="gray" onClick={close}>
            Tutup Detail
          </Button>
        </div>
      </Modal>

      {/* Modal Delete */}
      <Modal
        opened={deleteModal}
        onClose={cl}
        centered
        title={<span className="font-bold">Konfirmasi Hapus ?</span>}
      >
        <div>
          <span>Yakin hapus Kelas dengan nama </span>
          <span className="font-semibold text-blue-600"> {groupPicker?.name}</span>
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          <Button onClick={() => ConfirmDelete()}>Yakin</Button>

          <Button color="red" onClick={cl}>
            Batal
          </Button>
        </div>
      </Modal>

      <Modal
        opened={updateModal}
        onClose={closeUpdateModal}
        centered
        title={<span className="font-bold">Update Kelas</span>}
      >
        <UpdateFormGroup
          updateGroup={updateGroup}
          onsubmit={(data) => {
            data.id = updateGroup?.id;
            console.log(updateGroup?.id);
            handleUpdateSubmit(data);
            console.log(data);
          }}
        />

        {/* <div>
          <span>Yakin hapus pekerja dengan nama </span>
          <span className="font-semibold text-blue-600"> {groupPicker?.name}</span>
        </div> */}
        <div className="pt-10 flex gap-2 justify-end">
          <Button color="red" onClick={closeUpdateModal}>
            Batal
          </Button>
        </div>
      </Modal>
    </div>
  );
};
