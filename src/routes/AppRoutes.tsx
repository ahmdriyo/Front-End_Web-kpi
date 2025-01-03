import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { HomeLayout, AuthLayout, AppLayout, AdminLayout } from '@/components/layout';
import { useAuth } from '@/features/auth';
// import { queryClient } from '@/lib/react-query';
import { lazyImport } from '@/utils/lazyImport';

const { Development } = lazyImport(() => import('@/features/misc'), 'Development');
const { NotFoundLayout } = lazyImport(() => import('@/components/layout'), 'NotFoundLayout');
const { Login } = lazyImport(() => import('@/features/auth'), 'Login');

// Employee Role Pages
const { Home } = lazyImport(() => import('@/features/misc'), 'Home');
const { Attendance } = lazyImport(() => import('@/features/attendance'), 'Attendance');
const { AttendanceInfo } = lazyImport(() => import('@/features/attendance'), 'AttendanceInfo');
const { Attendances } = lazyImport(() => import('@/features/employee'), 'Attendances');
const { DetailActivity } = lazyImport(() => import('@/features/attendance'), 'DetailActivity');
const { DataAttendance } = lazyImport(() => import('@/features/history'), 'DataAttendance');
const { History } = lazyImport(() => import('@/features/history'), 'History');
const { DataAbsence } = lazyImport(() => import('@/features/history'), 'DataAbsence');
const { DetailAbsence } = lazyImport(() => import('@/features/history'), 'DetailAbsence');
const { DataPaidLeave } = lazyImport(() => import('@/features/history'), 'DataPaidLeave');
const { DetailPaidLeave } = lazyImport(() => import('@/features/history'), 'DetailPaidLeave');
const { DataOvertime } = lazyImport(() => import('@/features/history'), 'DataOvertime');
const { DetailOvertime } = lazyImport(() => import('@/features/history'), 'DetailOvertime');
const { Profile } = lazyImport(() => import('@/features/employee'), 'Profile');
const { Absence } = lazyImport(() => import('@/features/leave'), 'Absence');
const { AddAbsence } = lazyImport(() => import('@/features/leave'), 'AddAbsence');
const { EmployeeRequest } = lazyImport(
  () => import('@/features/supervisor_pages'),
  'EmployeeRequest'
);
const { DetailEmployeeRequest } = lazyImport(
  () => import('@/features/supervisor_pages'),
  'DetailEmployeeRequest'
);
const { EmployeeDivision } = lazyImport(
  () => import('@/features/supervisor_pages'),
  'EmployeeDivision'
);
const { DetailEmployeeDivision } = lazyImport(
  () => import('@/features/supervisor_pages'),
  'DetailEmployeeDivision'
);
const { EmployeeAttendance } = lazyImport(
  () => import('@/features/supervisor_pages'),
  'EmployeeAttendance'
);
const { DetailEmployeeAttendance } = lazyImport(
  () => import('@/features/supervisor_pages'),
  'DetailEmployeeAttendance'
);
const { DetailEmployeeOvertime } = lazyImport(
  () => import('@/features/supervisor_pages'),
  'DetailEmployeeOvertime'
);
const { DetailEmployeeAttendanceRequest } = lazyImport(
  () => import('@/features/supervisor_pages'),
  'DetailEmployeeAttendanceRequest'
);
const { EmployeeMonthlyAttendance } = lazyImport(
  () => import('@/features/supervisor_pages'),
  'EmployeeMonthlyAttendance'
);
const { Application } = lazyImport(() => import('@/features/application'), 'Application');
const { PaidLeave } = lazyImport(() => import('@/features/paid-leave'), 'PaidLeave');
const { AddPaidLeave } = lazyImport(() => import('@/features/paid-leave'), 'AddPaidLeave');
const { Overtime } = lazyImport(() => import('@/features/overtime'), 'Overtime');
const { AddOvertime } = lazyImport(() => import('@/features/overtime'), 'AddOvertime');
const { LateRequest } = lazyImport(() => import('@/features/late-request'), 'LateRequest');
const { AddLateRequest } = lazyImport(() => import('@/features/late-request'), 'AddLateRequest');
const { DetailLateRequest } = lazyImport(
  () => import('@/features/late-request'),
  'DetailLateRequest'
);
const { EduBackground } = lazyImport(() => import('@/features/employee'), 'EduBackground');
const { EduBackgroundAdd } = lazyImport(() => import('@/features/employee'), 'EduBackgroundAdd');
const { EditEduBackground } = lazyImport(() => import('@/features/employee'), 'EditEduBackground');
const { Biodata } = lazyImport(() => import('@/features/employee'), 'Biodata');
const { BiodataEdit } = lazyImport(() => import('@/features/employee'), 'BiodataEdit');
const { FileProfile } = lazyImport(() => import('@/features/employee'), 'FileProfile');
const { LaborerGroup } = lazyImport(() => import('@/features/academics'), 'LaborerGroup');
const { Laborer } = lazyImport(() => import('@/features/academics'), 'Laborer');
const { Memorization } = lazyImport(() => import('@/features/academics'), 'Memorization');
const { GroupSession } = lazyImport(() => import('@/features/academics'), 'GroupSession');
const { HistoryLaborerAttendance } = lazyImport(
  () => import('@/features/academics'),
  'HistoryLaborerAttendance'
);

// Admin Role Pages
const { DinamicDashboard } = lazyImport(() => import('@/components/misc'), 'DinamicDashboard');
const { Schedule: AdminSchedule } = lazyImport(
  () => import('@/admin_features/schedule'),
  'Schedule'
);
const { Attendance: AdminAttendance } = lazyImport(
  () => import('@/admin_features/attendance'),
  'Attendance'
);
const { CreateSchedule } = lazyImport(() => import('@/admin_features/schedule'), 'CreateSchedule');
const { UpdateSchedule } = lazyImport(() => import('@/admin_features/schedule'), 'UpdateSchedule');
const { ShiftAdmin } = lazyImport(() => import('@/admin_features/shift'), 'ShiftAdmin');
const { UpdateShift } = lazyImport(() => import('@/admin_features/shift'), 'UpdateShift');
const { Employees } = lazyImport(() => import('@/admin_features/employees'), 'Employees');
const { DetailEmployee } = lazyImport(() => import('@/admin_features/employees'), 'DetailEmployee');
const { Division } = lazyImport(() => import('@/admin_features/division'), 'Division');
const { CreateDivision } = lazyImport(() => import('@/admin_features/division'), 'CreateDivision');
const { UpdateDivision } = lazyImport(() => import('@/admin_features/division'), 'UpdateDivision');
const { CreateShift } = lazyImport(() => import('@/admin_features/shift'), 'CreateShift');
const { CreateEmployee } = lazyImport(() => import('@/admin_features/employees'), 'CreateEmployee');
const { UpdateEmployee } = lazyImport(() => import('@/admin_features/employees'), 'UpdateEmployee');
const { Users } = lazyImport(() => import('@/admin_features/users'), 'Users');
const { CreateUser } = lazyImport(() => import('@/admin_features/users'), 'CreateUser');
const { UpdateUser } = lazyImport(() => import('@/admin_features/users'), 'UpdateUser');
const { Activitys } = lazyImport(() => import('@/admin_features/activity'), 'Activitys');
const { CreateActivityVariable } = lazyImport(
  () => import('@/admin_features/activity/pages'),
  'CreateActivityVariable'
);
const { UpdateActivityVariable } = lazyImport(
  () => import('@/admin_features/activity/pages'),
  'UpdateActivityVariable'
);
const { Leave } = lazyImport(() => import('@/admin_features/leaves'), 'Leave');
const { Permission } = lazyImport(() => import('@/admin_features/permission'), 'Permission');
const { Overtime: OvertimeAdmin } = lazyImport(
  () => import('@/admin_features/overtime'),
  'Overtime'
);
const { Locations } = lazyImport(() => import('@/admin_features/location'), 'Locations');
const { CreateLocations } = lazyImport(
  () => import('@/admin_features/location/pages'),
  'CreateLocations'
);
const { UpdateLocations } = lazyImport(
  () => import('@/admin_features/location/pages'),
  'UpdateLocations'
);
const { AttendanceRequest } = lazyImport(
  () => import('@/admin_features/attendance/pages'),
  'AttendanceRequest'
);
const { Company } = lazyImport(() => import('@/superadmin/company'), 'Company');
const { TutorialApplication } = lazyImport(
  () => import('@/admin_features/misc'),
  'TutorialApplication'
);

// import Evaluation from '@/admin_features/freelancer_features/pages/Evaluation/Evaluation';
const { Freelancer } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'Freelancer'
);
const { EvaluationPage } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'EvaluationPage'
);
const { EditEvaluationQuran } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'EditEvaluationQuran'
);

// const { Evaluation } = lazyImport(
//   () => import('@/admin_features/freelancer_features/pages'),
//   'Evaluation'
// );
const { DataMaster } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'DataMaster'
);
const { CreateDataMaster } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'CreateDataMaster'
);

const { MapelSchedules } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'MapelSchedules'
);
const { MapelScheduleCreate } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'MapelScheduleCreate'
);

const { EvaluationDetail } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'EvaluationDetail'
);
// const { CreateEvaluation } = lazyImport(
//   () => import('@/admin_features/freelancer_features/pages'),
//   'CreateEvaluation'
// );
const { CreateEvaluationSiswa } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'CreateEvaluationSiswa'
);

const { CreateFreelancer } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'CreateFreelancer'
);

const { Session } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'Session'
);

const { CreateSession } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'CreateSession'
);

const { UpdateSession } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'UpdateSession'
);

const { AttendanceFreelancer } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'AttendanceFreelancer'
);

const { Group } = lazyImport(() => import('@/admin_features/freelancer_features/pages'), 'Group');
const { Schedule } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'Schedule'
);
const { CreateGroup } = lazyImport(
  () => import('@/admin_features/freelancer_features/pages'),
  'CreateGroup'
);

// const useAuth = () => {
//   return {
//     creds: {
//       role: 'superadmin',
//     },
//   };
// };
export const AppRoutes: React.FC = () => {
  const { creds } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Routes for Employee or Mobile APP ======================>*/}
        {creds?.role === 'employee' || creds?.role === 'supervisor' ? (
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="activity/detail" element={<DetailActivity />} />
            <Route path="application" element={<Application />} />
            <Route path="info-attendance" element={<AttendanceInfo />} />
            <Route path="history">
              <Route index element={<History />} />
              <Route path="data-attendance" element={<DataAttendance />} />
              <Route path="data-absence">
                <Route index element={<DataAbsence />} />
                <Route path=":id" element={<DetailAbsence />} />
              </Route>
              <Route path="data-paid-leave">
                <Route index element={<DataPaidLeave />} />
                <Route path="detail" element={<DetailPaidLeave />} />
              </Route>
              <Route path="data-overtime">
                <Route index element={<DataOvertime />} />
                <Route path="detail" element={<DetailOvertime />} />
              </Route>
            </Route>
            <Route path="employee-request">
              <Route index element={<EmployeeRequest />} />
              <Route path="detail" element={<DetailEmployeeRequest />} />
              <Route path="overtime/detail" element={<DetailEmployeeOvertime />} />
              <Route path="attendance/detail" element={<DetailEmployeeAttendanceRequest />} />
            </Route>
            <Route path="employee-division">
              <Route index element={<EmployeeDivision />} />
              <Route path="detail" element={<DetailEmployeeDivision />} />
              <Route path="monthly-attendance">
                <Route index element={<EmployeeMonthlyAttendance />} />
                <Route path="detail" element={<DetailEmployeeAttendance />} />
              </Route>
              <Route path="schedule" element={<Schedule />} />
              <Route path="attendance">
                <Route index element={<EmployeeAttendance />} />
                {/* <Route path="detail" element={<DetailEmployeeAttendance />} /> */}
              </Route>
            </Route>
            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path="biodata" element={<Biodata />} />
              <Route path="file" element={<FileProfile />} />
              <Route path="biodata/edit" element={<BiodataEdit />} />
              <Route path="edu-background">
                <Route index element={<EduBackground />} />
                <Route path="add" element={<EduBackgroundAdd />} />
                <Route path="edit" element={<EditEduBackground />} />
              </Route>
            </Route>
            <Route path="laborer-group">
              <Route index element={<LaborerGroup />} />
              <Route path="session">
                <Route index element={<GroupSession />} />
                <Route path="laborer" element={<Laborer />} />
                <Route path="memorize-quran" element={<Memorization />} />
              </Route>
              <Route path="history" element={<HistoryLaborerAttendance />} />
            </Route>

            {/* Route Menu List */}
            <Route path="absence">
              <Route index element={<Absence />} />
              <Route path="add" element={<AddAbsence />} />
            </Route>
            <Route path="paid-leave">
              <Route index element={<PaidLeave />} />
              <Route path="add" element={<AddPaidLeave />} />
            </Route>
            <Route path="overtime">
              <Route index element={<Overtime />} />
              <Route path="add" element={<AddOvertime />} />
            </Route>
            <Route path="late-request">
              <Route index element={<LateRequest />} />
              <Route path="add" element={<AddLateRequest />} />
              <Route path="detail" element={<DetailLateRequest />} />
            </Route>

            <Route path="schedule" element={<Schedule />} />
            <Route path="attendances" element={<Attendances />} />
          </Route>
        ) : (
          ''
        )}

        {/* Routes for Admin with Desktop View ======================>*/}
        {creds?.role === 'admin' || creds?.role === 'superadmin' ? (
          <Route element={<AdminLayout />}>
            <Route index path="/" element={<RedirectToBeranda />} />
            <Route path="tutorial" element={<TutorialApplication />} />
            <Route path="beranda" element={<DinamicDashboard />} />
            <Route path="schedule" element={<AdminSchedule />} />
            <Route path="schedule/create" element={<CreateSchedule />} />
            <Route path="schedule/update" element={<UpdateSchedule />} />
            <Route path="shift" element={<ShiftAdmin />} />
            <Route path="shift/:id" element={<UpdateShift />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="request-attendance" element={<AttendanceRequest />} />
            <Route path="employees" element={<Employees />} />
            <Route path="division" element={<Division />} />
            <Route path="division/create" element={<CreateDivision />} />
            <Route path="division/update" element={<UpdateDivision />} />
            <Route path="shift/create" element={<CreateShift />} />
            <Route path="employees/create" element={<CreateEmployee />} />
            <Route path="employees/update" element={<UpdateEmployee />} />
            <Route path="employees/detail/:id" element={<DetailEmployee />} />
            <Route path="users" element={<Users />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="users/update" element={<UpdateUser />} />
            <Route path="activity" element={<Activitys />} />
            <Route path="activity/create" element={<CreateActivityVariable />} />
            <Route path="activity/update" element={<UpdateActivityVariable />} />
            <Route path="leave" element={<Leave />} />
            <Route path="permission" element={<Permission />} />
            <Route path="overtime" element={<OvertimeAdmin />} />
            <Route path="locations" element={<Locations />} />
            <Route path="locations/create" element={<CreateLocations />} />
            <Route path="locations/update" element={<UpdateLocations />} />
            {creds?.role == 'superadmin' && <Route path="company" element={<Company />} />}
            {/* Freelence Conditions =============================================================================> */}
            <Route path="freelancer" element={<Freelancer />} />
            <Route path="mapel-scedules" element={<MapelSchedules />} />
            <Route path="mapel-scedules/create" element={<MapelScheduleCreate />} />
            {/* <Route path="evaluation" element={<Evaluation />} /> */}
            <Route path="datamaster" element={<DataMaster />} />
            <Route path="evaluation" element={<EvaluationPage />} />
            {/* <Route path="evaluation/edit" element={<EditEvaluation />} /> */}
            <Route path="datamaster/create" element={<CreateDataMaster />} />
            <Route path="evaluation/detail" element={<EvaluationDetail />} />
            {/* <Route path="evaluation/create" element={<CreateEvaluation />} /> */}
            <Route path="evaluation/edit" element={<EditEvaluationQuran />} />
            <Route path="freelancer/create" element={<CreateFreelancer />} />
            <Route path="session" element={<Session />} />
            <Route path="session/create" element={<CreateSession />} />
            <Route path="session/update/:id" element={<UpdateSession />} />
            <Route path="group" element={<Group />} />
            <Route path="group/schedule" element={<Schedule />} />
            <Route path="group/create" element={<CreateGroup />} />
            <Route path="attendance_freelancer" element={<AttendanceFreelancer />} />
          </Route>
        ) : (
          <Route path="development" element={<Development />} />
        )}

        {/* Route For Development */}
        <Route path="development" element={<Development />} />
        <Route path="*" element={<NotFoundLayout />} />
      </Route>

      {/* Authentication Page */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

// ========================= List Function =======================
// Function For Redireact
const RedirectToBeranda: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/beranda');
  }, [navigate]);
  return null;
};
