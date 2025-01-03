import { TableAttendance, TesDataAtt } from '../../components';
import TesData from '../../components/TableAttendance/TesData';

export const AttendanceFreelancer: React.FC = () => {
  return (
    <main>
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Kehadiran Siswa</h2>
            <div className="-mt-1 text-xs text-slate-400">Berikut Daftar Kehadiran Siswa</div>
          </div>
        </div>
        <div className="flex gap-2"></div>
        <div className="mt-1">
          <TableAttendance />
          {/* <TesData /> */}
          {/* <TesDataGroup /> */}
          {/* <TesDataAtt /> */}
        </div>
      </section>
    </main>
  );
};
