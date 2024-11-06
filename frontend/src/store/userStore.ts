/**
 * Managing global user state with zustand
 */

import { create } from "zustand";
import { Role } from "@/utils/schemas/SchemaConstants";

// role type definition, as a union of the enum values
type RoleType = (typeof Role)[keyof typeof Role];

// zustand store definition
interface UserStore {
  role: RoleType | null; // null at the start
  setRole: (newRole: RoleType) => void; // set the new role
  clearRole: () => void; // clear a role
}

// zustand store creation
const useUserStore = create<UserStore>((set) => ({
  role: null, // starts as null initially
  setRole: (newRole) => set({ role: newRole }),
  clearRole: () => set({ role: null }),
}));

export default useUserStore;
