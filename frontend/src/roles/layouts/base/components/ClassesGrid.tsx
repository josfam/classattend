import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassItem } from "../types/Types";

interface ClassListProps {
  classList: ClassItem[] | null;
}

const ClassesGrid: React.FC<ClassListProps> = ({ classList }) => {
  return (
    <div className="flex w-full justify-between gap-5">
      {classList &&
        classList.map((classItem) => (
          <Card
            key={classItem.id}
            className="flex h-48 w-[350px] flex-col gap-2 shadow-lg transition-all duration-150 hover:scale-105 hover:shadow-xl"
          >
            <CardHeader className="h-fit rounded-t-lg bg-slate-500 px-0 pt-4">
              <CardTitle className="flex flex-col items-center justify-center gap-2 text-slate-50">
                <div className="w-5/6 overflow-x-clip text-ellipsis text-nowrap text-xl">
                  {classItem.className}
                </div>
                <div className="text-xl font-normal">{classItem.classCode}</div>
              </CardTitle>
            </CardHeader>
            <div className="mb-4 mt-auto flex w-full items-center justify-center">
              <button className="btn-sec btn-ghost w-40">Open</button>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default ClassesGrid;
