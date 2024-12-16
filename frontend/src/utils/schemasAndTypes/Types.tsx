import { Role } from "./SchemaConstants";

// for every class object
type AttendanceData = {
  attendance_id: string;
  classId: number;
  id: number;
  isOpen: boolean;
  studentId: number;
};

type ClassItem = {
  id: number;
  classCode: string;
  className: string;
  classDescription: string;
  attendanceOpen: boolean;
  attendanceData: null | AttendanceData;
  lecturerId: number;
};

type StudentListType = {
  "first name": string;
  "last name": string;
  "student email": string;
};

type StudentDataInClassroom = {
  firstName: string;
  isPending: boolean;
  lastName: string;
  studentId: number;
  hasTakenAttendance: null | boolean;
};

type uploadedStudentPayload = {
  classId: number;
  students: StudentListType[];
};

type RoleType = (typeof Role)[keyof typeof Role];

type decodedJWTToken = {
  user_id: number;
  role: RoleType;
  expiration: string;
};

export type {
  ClassItem,
  StudentListType,
  uploadedStudentPayload,
  StudentDataInClassroom,
  RoleType,
  decodedJWTToken,
  AttendanceData,
};
