import { z } from "zod";
import { Role } from "./SchemaConstants";

const SharedSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "Must be longer than 2 characters" })
    .max(50, { message: "Must be less than 50 characters" }),
  lastname: z
    .string()
    .min(2, { message: "Must be longer than 2 characters" })
    .max(50, "Must be less than 50 characters"),
  email: z.string().email("This is not a valid email"),
  password: z.string(),
  passwordConfirmation: z.string(),
  role: z.enum([Role.Lecturer, Role.Student]),
});

const LecturerSchema = SharedSchema.extend({
  faculty: z.enum(
    [
      "Science and Technology",
      "Law",
      "Business and Management",
      "Post Graduate Studies and Research",
      "Socio-Economic Sciences",
    ],
    { message: "Choose at least one faculty" },
  ),
  title: z.enum(["Mr.", "Mrs.", "Ms.", "Madam", "Professor", "Doctor"], {
    message: "Choose at least one title",
  }),
  staffId: z.string().min(1, { message: "Provide your staff id" }),
  role: z.literal(Role.Lecturer),
});

const StudentSchema = SharedSchema.extend({
  studentId: z.string().min(1, { message: "Provide your student id" }),
  role: z.literal(Role.Student),
});

const SignupFormSchema = z.discriminatedUnion("role", [
  LecturerSchema,
  StudentSchema,
]);

const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email",
  }),
  password: z.string().min(1, { message: "A password is required" }),
});

const AddClassroomSchema = z.object({
  className: z
    .string()
    .min(3, { message: "Name must be longer than 3 characters" }),
  classCode: z
    .string()
    .min(3, { message: "Code must be longer than 3 characters" }),
  classDescription: z
    .string()
    .min(10, { message: "Description must be longer than 10 characters" }),
});

export {
  SharedSchema,
  LecturerSchema,
  StudentSchema,
  SignupFormSchema,
  LoginFormSchema,
  AddClassroomSchema,
};
