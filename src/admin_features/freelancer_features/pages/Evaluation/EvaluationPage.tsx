import { EvaluationQuranTable } from '../../components';

export const EvaluationPage: React.FC = () => {
  return (
    <div>
      <main>
        <section className="bg-white p-5 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="font-bold">Daftar Nilai Siswa</h2>
              <div className="-mt-1 text-xs text-slate-400">Berikut Daftar Nilai Siswa</div>
            </div>
          </div>
          <div className="flex gap-2"></div>
          <div className="mt-1">
            <EvaluationQuranTable />
          </div>
        </section>
      </main>
    </div>
  );
};
// Alur
// pilih worker_attendances > tambah evaluation_qurans berdasarkan inputan dan worker_attendance_id yg di pilih
// > update field evaluation_quran_id di table worker_attendances berdasarkan evaluation_qurans id yg baru di buat tadi
