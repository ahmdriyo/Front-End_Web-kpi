import { Avatar, Badge, Button, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconChevronRight, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Companys, useAuth } from '@/features/auth';
import { useCreateCompany, useGetCompanys } from '@/superadmin/company';
import { FormCompany } from '@/superadmin/company/components';

export const DashboardSuperadmin: React.FC = () => {
  const { creds } = useAuth();

  const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Company, setCompany] = useState<Companys | undefined>(undefined);
  const navigate = useNavigate();
  if (creds === null) navigate('/login');

  const { data: CompanyList, isLoading: LoadCompany, refetch } = useGetCompanys();

  // Create Company
  const MutationCreate = useCreateCompany();
  const [opened, { open, close }] = useDisclosure(false);
  const handleCreate = async (data: any) => {
    MutationCreate.mutateAsync(data, {
      onSuccess() {
        close();
        refetch();
        notifications.show({
          title: 'Berhasil',
          message: 'Company berhasil ditambahkan',
          color: 'teal',
        });
      },
    });
  };

  // Change Company
  const handleChangeCompany = (company: Companys) => {
    setCompany(company);
    if (company?.id) {
      localStorage.setItem('id_company', company?.id.toString());
      localStorage.setItem('COMPANY_DATA', JSON.stringify(company));
      localStorage.setItem('name_company', company?.name);
    }
    window.location.reload();
  };

  // Get Data Companys
  // Loading Get Data Companys
  if (LoadCompany) return <div>Loading...</div>;
  // RENDER COMPONENT =====================================================
  return (
    <main>
      {/* Dashboard Superadmin */}
      <section className="m-3 mx-7 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="font-semibold text-xl">
          Selamat Datang <span className="text-blue-600 font-semibold">Superadmin,</span>
        </h1>
      </section>

      {/* Daftar atau List Daftar Company */}
      <section className="m-3 mt-5 mx-7 p-6 bg-white rounded-lg shadow-lg">
        <div id="Header-List-Company" className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">Daftar Company atau Perusahaan</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar Company atau Perusahaan yang terdaftar
            </div>
          </div>

          <Button onClick={open} leftSection={<IconPlus size={18} />}>
            Tambah Company Baru
          </Button>
        </div>
        <div id="DataCompany" className="grid grid-cols-1 mt-5">
          <div id="ListCompany">
            <Table withColumnBorders withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="font-semibold" style={{ width: 70, textAlign: 'center' }}>
                    No
                  </Table.Th>
                  <Table.Th className="font-semibold">Logo</Table.Th>
                  <Table.Th className="font-semibold">Nama Company</Table.Th>
                  <Table.Th className="font-semibold">URL Company</Table.Th>
                  <Table.Th className="font-semibold">Status Shift</Table.Th>
                  <Table.Th className="font-semibold" style={{ width: 150, textAlign: 'center' }}>
                    Kelola Company
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {CompanyList?.map((company: Companys, index: number) => {
                  return (
                    <Table.Tr key={index}>
                      <Table.Td style={{ width: 70, textAlign: 'center' }}>{index + 1}</Table.Td>
                      <Table.Td style={{ width: 80 }}>
                        <Avatar
                          size={'lg'}
                          src={`${BaseURL}/public/company-logo/${company.company_logo}`}
                          radius={'sm'}
                        />
                      </Table.Td>
                      <Table.Td>{company?.name}</Table.Td>
                      <Table.Td>{company?.companyUrl}</Table.Td>
                      <Table.Td>{company?.shift_active == true ? 'Aktif' : 'Tidak Aktif'}</Table.Td>
                      <Table.Td>
                        {company?.is_freelanced ? (
                          <Badge color="teal">Freelance</Badge>
                        ) : (
                          <Badge color="gray">NonFreelance</Badge>
                        )}
                      </Table.Td>
                      <Table.Td>
                        <div className="flex gap-2 items-center justify-center">
                          <Button
                            onClick={() => handleChangeCompany(company)}
                            color="blue"
                            rightSection={<IconChevronRight size={20} />}
                          >
                            Masuk Company
                          </Button>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </div>
        </div>
      </section>

      {/* Form Company */}
      <FormCompany
        onSubmit={handleCreate}
        onClose={close}
        loading={MutationCreate.isPending}
        opened={opened}
      />
    </main>
  );
};
