import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClassItem } from "../types/Types";

interface ClassListProps {
  classList: ClassItem[] | null;
}

const ClassesGrid: React.FC<ClassListProps> = ({ classList }) => {
  return (
    <div className="flex gap-5">
      {classList &&
        classList.map((classItem) => (
          <Card key={classItem.id} className="w-80 shadow-lg">
            <CardHeader>
              <CardTitle>{classItem.className}</CardTitle>
            </CardHeader>
            <CardDescription>{classItem.classCode}</CardDescription>
          </Card>
        ))}
    </div>
  );
};

export default ClassesGrid;
