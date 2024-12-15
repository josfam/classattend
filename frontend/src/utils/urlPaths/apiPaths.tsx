// all paths have a / at the end of them

const backendApiPath = import.meta.env.VITE_BACKEND_API_URL;
const baseApiPath = `${backendApiPath}${import.meta.env.VITE_API_BASE_PATH}`;
const authApiPath = `${baseApiPath}${import.meta.env.VITE_AUTH_API_BASE_PATH}`;
const lecturerApiPath = `${baseApiPath}${import.meta.env.VITE_LECTURER_API_BASE_PATH}`;
const studentApiPath = `${baseApiPath}${import.meta.env.VITE_STUDENT_API_BASE_PATH}`;
const classroomApiPath = `${baseApiPath}${import.meta.env.VITE_CLASSROOM_API_BASE_PATH}`;
const attendanceApiPath = `${baseApiPath}${import.meta.env.VITE_ATTENDANCE_API_BASE_PATH}`;

export {
  backendApiPath,
  baseApiPath,
  authApiPath,
  lecturerApiPath,
  studentApiPath,
  classroomApiPath,
  attendanceApiPath,
};
