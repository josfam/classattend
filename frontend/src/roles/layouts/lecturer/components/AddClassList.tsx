import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { StudentListType } from "@/utils/schemasAndTypes/Types";
import Papa from "papaparse";
import { ErrorToast, SuccessToast } from "@/components/Toasts";
import { lecturerApiPath } from "@/utils/urlPaths/apiPaths";

const AddClassListInput = () => {
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [studentFileData, setStudentFileData] = useState<StudentListType[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileSelected(file);
    }
  };

  const handleFileUpload = async () => {
    if (!fileSelected) {
      ErrorToast({ message: "Please select a file of student data" });
      return;
    }

    Papa.parse(fileSelected, {
      complete: (results) => {
        SuccessToast({ message: "File processed successfully" });
        const studentData = results.data as StudentListType[]; // type cast
        setStudentFileData(studentData);
        console.log(studentData); // DEBUG
      },
      header: true,
      skipEmptyLines: true,
    });

    const uploadStudentList = async (studentData: StudentListType[]) => {
      try {
        const response = await fetch(`${lecturerApiPath}uploadStudentList`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
          credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
          ErrorToast({ message: data.message });
        } else {
          SuccessToast({ message: data.message });
        }
      } catch (error) {
        console.error(error);
        ErrorToast({
          message: "There was a problem uploading the list. Try again.",
        });
      }
    };

    await uploadStudentList(studentFileData);
  };

  return (
    <div className="flex h-fit w-full flex-col items-center gap-10 rounded-lg border border-slate-300 bg-slate-100 px-6 py-6 md:flex-row">
      <div className="flex-col items-center justify-center gap-1 py-4">
        <p className="text-left text-xl text-slate-700">
          There are no students yet in this class
        </p>
        <p className="text-left text-xl text-slate-700">
          Upload your students file to add them
        </p>
      </div>
      <div className="flex grow flex-col items-center gap-4 md:flex-row">
        <div className="form-item">
          <Label htmlFor="studentListUpload" className="text-lg text-slate-700">
            Students file (csv)
          </Label>
          <Input
            id="studentListUpload"
            accept=".csv"
            type="file"
            onChange={handleFileSelect}
            className="h-10 bg-white text-lg"
          ></Input>
        </div>
        <button
          className="btn-sec self-start text-nowrap md:self-end"
          onClick={handleFileUpload}
        >
          Upload file
        </button>
      </div>
    </div>
  );
};

export default AddClassListInput;
