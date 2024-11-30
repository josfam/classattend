// for every class object
type ClassItem = {
  id: number;
  classCode: string;
  className: string;
  classDescription: string;
};

type StudentListType = {
  "first name": string;
  "last name": string;
  "student email": string;
};

type uploadedStudentPayload = {
  classId: number,
  students: StudentListType[],
}

export type { ClassItem, StudentListType, uploadedStudentPayload};
