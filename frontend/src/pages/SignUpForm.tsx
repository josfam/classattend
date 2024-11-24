import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// shadcn components
import {
  Form,
  FormField,
  FormLabel,
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

import {
  UserOptions,
  LecturerOptions,
  StudentOptions,
} from "@/components/UserFormsOptions";
import { Card, CardHeader } from "@/components/ui/card";
import { SignupFormSchema } from "@/utils/schemasAndTypes/LecturerStudentSchemas";
import { loginPath } from "@/utils/urlPaths/appUrlPaths";
import signupUser from "../utils/auth/SignupUser";

const SignupForm: React.FC = () => {
  const [formStep, setFormStep] = useState<number>(1); // current step in the form
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const nextStep = () => setFormStep((current) => current + 1);
  const prevStep = () => setFormStep((current) => current - 1);
  const navigate = useNavigate();

  // form definition
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      role: undefined,
      faculty: undefined,
      title: undefined,
      staffId: "",
      studentId: "",
    },
    mode: "onChange",
  });

  const userRole = form.watch("role"); // watch for changes in the role form element
  const password = form.watch("password");
  const passwordConfirmation = form.watch("passwordConfirmation");

  // submit handler
  const onSubmit = async (data: z.infer<typeof SignupFormSchema>) => {
    if (!passwordsMatch) {
      toast.error("Make sure passwords match before signing up");
      return;
    }
    const response = await signupUser({ userData: data });
    if (response.success) {
      navigate(`${loginPath}`, {
        state: { showSuccessToast: true, message: response.message },
      });
    } else {
      toast.error(response.message);
      console.log(response.message);
    }
  };

  // update the role on change
  useEffect(() => {
    console.log(`Role: ${userRole} selected`);
  }, [userRole]);

  // check for password matching
  useEffect(() => {
    if (password.length > 0 || passwordConfirmation.length > 0) {
      setPasswordsMatch(password === passwordConfirmation);
    } else {
      setPasswordsMatch(true);
    }
  }, [password, passwordConfirmation]);

  return (
    <Card className="flex h-fit w-1/2 flex-col items-center justify-center border bg-slate-100 pb-8 shadow-lg shadow-slate-300">
      <CardHeader className="mb-4 w-full rounded-t-lg bg-slate-300 p-4 text-xl font-medium text-slate-600">
        {`Sign up (${formStep}/2)`}
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col gap-6 px-10 py-4"
        >
          {/* conditionally render elements depending on the step of the form that the user is on */}
          {formStep === 1 && (
            <UserOptions
              form={form}
              nextStep={nextStep}
              passwordsMatch={passwordsMatch}
            />
          )}

          {/* step 2 */}
          {formStep === 2 && (
            <>
              {/* role handled manually to eliminate fields confusion */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel className="text-base">Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-white text-lg font-normal">
                        <SelectValue
                          placeholder="Select your role"
                          className="text-lg"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Lecturer" className="text-lg">
                          Lecturer
                        </SelectItem>
                        <SelectItem value="Student" className="text-lg">
                          Student
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* get additional information depending on role */}
              {userRole === "Lecturer" && <LecturerOptions form={form} />}

              {userRole === "Student" && <StudentOptions form={form} />}

              <div className="flex gap-4">
                <button
                  onClick={prevStep}
                  className="btn-pri btn-sec mt-4 flex-1"
                >
                  Back
                </button>
                <button type="submit" className="btn-pri mt-4 flex-1">
                  Sign up
                </button>
              </div>
            </>
          )}
        </form>
      </Form>
      <p className="flex gap-3 text-base">
        Already have an account?{" "}
        <a
          href={`${loginPath}`}
          className="font-semibold text-sky-600 hover:text-sky-800 hover:underline hover:underline-offset-4 active:text-sky-900"
        >
          Login
        </a>
      </p>
    </Card>
  );
};

export default SignupForm;
