/**
 * Managing global class attendance state
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// zustand state definition for a class' state

interface ClassroomStore {
  attendanceStatus: Record<number, boolean>;
  setAttendanceOpen: (classId: number, isOpen: boolean) => void;
  clearAttendanceStatuses: () => void;
}

// store creation
const useClassroomStore = create<ClassroomStore>()(
  persist(
    (set) => ({
      // Initial state
      attendanceStatus: {},

      // Method for updating the state
      setAttendanceOpen: (classId, isOpen) =>
        set((currentState) => ({
          attendanceStatus: {
            ...currentState.attendanceStatus,
            [classId]: isOpen,
          },
        })),

      // Method for clearing all attendance statuses for classes
      clearAttendanceStatuses: () =>
        set(() => ({
          attendanceStatus: {},
        })),
    }),
    {
      name: "classroom-attendance-statuses", // local storage name
    },
  ),
);

export default useClassroomStore;
