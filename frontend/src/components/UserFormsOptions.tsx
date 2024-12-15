import {
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

// shared fields among the schemas
type SharedSchema = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

// Lecturer-specific type
type LecturerFormSchema = SharedSchema & {
  role: "Lecturer";
  faculty:
    | "Science and Technology"
    | "Law"
    | "Business and Management"
    | "Post Graduate Studies and Research"
    | "Socio-Economic Sciences";
  title: "Mr." | "Mrs." | "Ms." | "Madam" | "Professor" | "Doctor";
  staffId: string;
};

// Student-specific type
type StudentFormSchema = SharedSchema & {
  role: "Student";
  studentId: string;
};

// combined type for both student and lecturer schemas
type FormSchema = LecturerFormSchema | StudentFormSchema;

interface UserOptionsProps {
  form: UseFormReturn<FormSchema, undefined>;
  nextStep: () => void;
  passwordsMatch: boolean;
}

interface LecturerOptionsProps {
  form: UseFormReturn<FormSchema, undefined>;
}

interface StudentOptionsProps {
  form: UseFormReturn<FormSchema, undefined>;
}

const UserOptions = ({ form, nextStep, passwordsMatch }: UserOptionsProps) => {
  return (
    <>
      <div className="flex flex-col gap-x-4 gap-y-6 md:flex-row">
        {/* surname */}
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className="form-item">
              <FormLabel className="text-base">Surname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your surname"
                  {...field}
                  className="bg-white text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* firstname */}
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="form-item">
              <FormLabel className="text-base">Given name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your first name"
                  {...field}
                  className="bg-white text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* email */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="form-item">
            <FormLabel className="text-base">Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email"
                {...field}
                className="bg-white text-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* password */}
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="form-item">
            <FormLabel className="text-base">Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Enter a password"
                {...field}
                className={`bg-white text-lg ${!passwordsMatch ? "border-2 border-red-400" : ""}`}
              />
            </FormControl>
            {!passwordsMatch && (
              <FormMessage>Passwords do not match</FormMessage>
            )}
          </FormItem>
        )}
      />

      {/* password confirmation */}
      <FormField
        control={form.control}
        name="passwordConfirmation"
        render={({ field }) => (
          <FormItem className="form-item">
            <FormLabel className="text-base">Password confirmation</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Re-type your password"
                {...field}
                className={`bg-white text-lg ${!passwordsMatch ? "border-2 border-red-400" : ""}`}
              />
            </FormControl>
            {!passwordsMatch && (
              <FormMessage>Passwords do not match</FormMessage>
            )}
          </FormItem>
        )}
      />
      <button type="button" onClick={nextStep} className="btn-pri mt-4">
        Next
      </button>
    </>
  );
};

const StudentOptions = ({ form }: StudentOptionsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="studentId"
        render={({ field }) => (
          <FormItem className="form-item">
            <FormLabel className="text-base">Student Id</FormLabel>
            <Input
              {...field}
              placeholder="Enter your student id"
              className="bg-white text-lg"
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const LecturerOptions = ({ form }: LecturerOptionsProps) => {
  return (
    <>
      <div className="flex w-full flex-grow gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="form-item flex-1">
              <FormLabel className="text-base">Title</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-white text-lg font-normal">
                  <SelectValue
                    placeholder="Select your title"
                    className="text-lg"
                  />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Mr." className="text-lg">
                    Mr.
                  </SelectItem>
                  <SelectItem value="Mrs." className="text-lg">
                    Mrs.
                  </SelectItem>
                  <SelectItem value="Ms." className="text-lg">
                    Ms.
                  </SelectItem>
                  <SelectItem value="Madam" className="text-lg">
                    Madam
                  </SelectItem>
                  <SelectItem value="Professor" className="text-lg">
                    Professor
                  </SelectItem>
                  <SelectItem value="Doctor" className="text-lg">
                    Doctor
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="staffId"
          render={({ field }) => (
            <FormItem className="form-item flex-3">
              <FormLabel className="text-base">Staff Id</FormLabel>
              <Input
                {...field}
                placeholder="Enter your staff id"
                className="bg-white text-lg"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="faculty"
        render={({ field }) => (
          <FormItem className="form-item flex-3">
            <FormLabel className="text-base">Faculty</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="bg-white text-lg font-normal">
                <SelectValue
                  placeholder="Select your faculty"
                  className="text-lg"
                />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Science and Technology" className="text-lg">
                  Science and Technology
                </SelectItem>
                <SelectItem value="Law" className="text-lg">
                  Law
                </SelectItem>
                <SelectItem value="Business and Management" className="text-lg">
                  Business and Management
                </SelectItem>
                <SelectItem
                  value="Post Graduate Studies and Research"
                  className="text-lg"
                >
                  Post Graduate Studies and Research
                </SelectItem>
                <SelectItem value="Socio-Economic Sciences" className="text-lg">
                  Socio-Economic Sciences
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export { UserOptions, StudentOptions, LecturerOptions };
