import {
	FormField,
	FormLabel,
	FormControl,
	FormItem,
	FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

// form schema shared among multiple interfaces
type FormSchema = {
  firstname: string;
  lastname: string;
  email: string;
  role: "Student" | "Lecturer";
  password: string;
  passwordConfirmation: string;
  faculty: "Science and Technology" | "Law" | "Business and Management" | "Post Graduate Studies and Research" | "Socio-Economic Sciences";
  title: "Mr." | "Mrs." | "Ms." | "Madam" | "Professor" |"Doctor";
  staffId: string;
}

interface UserOptionsProps {
  form: UseFormReturn<FormSchema, any, undefined>;
  nextStep: () => void;
}

interface LecturerOptionsProps {
  form: UseFormReturn<FormSchema, any, undefined>;
}

const UserOptions = ({ form, nextStep }: UserOptionsProps) => {
  return (
    <>
    <div className="flex gap-4">
      {/* surname */}
      <FormField
        control={form.control}
        name="lastname"
        render={({ field }) => (
          <FormItem className="form-item">
            <FormLabel className="text-base">Surname</FormLabel>
            <FormControl>
              <Input placeholder="Enter your surname" {...field}
              className="text-lg bg-white"/>
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
              <Input placeholder="Enter your first name" {...field}
              className="text-lg bg-white"/>
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
          <Input type="email" placeholder="Enter your email" {...field}
          className="text-lg bg-white"/>
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
            <Input type="password" placeholder="Enter a password" {...field}
            className="text-lg bg-white"/>
          </FormControl>
          <FormMessage />
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
            <Input type="password" placeholder="Re-type your password" {...field}
            className="text-lg bg-white"/>
          </FormControl>
          <FormMessage />
        </FormItem>
        )}
    />
    <button
      type="button"
      onClick={nextStep}
      className="btn-pri mt-4">
        Next
    </button>
    </>
  )
}

const StudentOptions = () => {

}

const LecturerOptions = ({ form }: LecturerOptionsProps) => {
return(
  <>
    <div className="flex flex-grow w-full gap-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="form-item flex-1">
            <FormLabel className="text-base">Title</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="text-lg font-normal bg-white">
                <SelectValue placeholder="Select your title" className="text-lg"/>
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Mr." className="text-lg">Mr.</SelectItem>
                <SelectItem value="Mrs." className="text-lg">Mrs.</SelectItem>
                <SelectItem value="Ms." className="text-lg">Ms.</SelectItem>
                <SelectItem value="Madam" className="text-lg">Madam</SelectItem>
                <SelectItem value="Professor" className="text-lg">Professor</SelectItem>
                <SelectItem value="Doctor" className="text-lg">Doctor</SelectItem>
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
            <Input {...field} placeholder="Enter your staff id" className="text-lg bg-white"/>
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
              <SelectTrigger className="text-lg font-normal bg-white">
                <SelectValue placeholder="Select your faculty" className="text-lg"/>
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Science and Technology" className="text-lg">Science and Technology</SelectItem>
                <SelectItem value="Law" className="text-lg">Law</SelectItem>
                <SelectItem value="Business and Management" className="text-lg">Business and Management</SelectItem>
                <SelectItem value="Post Graduate Studies and Research" className="text-lg">Post Graduate Studies and Research</SelectItem>
                <SelectItem value="Socio-Economic Sciences" className="text-lg">Socio-Economic Sciences</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    
  </>
  )
}

export { UserOptions, StudentOptions, LecturerOptions }
