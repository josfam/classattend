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

export type { ClassItem, StudentListType };
