import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import { LoginFormSchema } from "@/utils/schemas/LecturerStudentSchemas";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Role } from "@/utils/schemas/SchemaConstants";
import { SuccessToast, ErrorToast } from "@/components/Toasts";
import LoginUser from "@/utils/auth/LoginUser";
import useUserStore from "@/store/userStore"; // zustand store

/**
 * Returns a login form
 * @returns The login form
 */
const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setRole } = useUserStore();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit handler
  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
      const response = await LoginUser({ userData: data });
      if (response.success) {
        const role = response.data.role;
        setRole(role);
        // redirect based on role
        if (role === Role.Student) {
          navigate("/student/", {
            state: { showSuccessToast: true, message: response.data.message },
          });
        } else if (role === Role.Lecturer) {
          navigate("/lecturer/", {
            state: { showSuccessToast: true, message: response.data.message },
          });
        }
      } else {
        ErrorToast({ message: response.message });
      }
    } catch (error) {
      console.error(error);
      const message = "There was an error during login. Please try again";
      ErrorToast({ message: message });
    }
  };

  // show successful login toast message from another page if stated
  useEffect(() => {
    if (location.state?.showSuccessToast) {
      const successMessage = location.state.message;
      SuccessToast({ message: successMessage });

      // clear success message toast
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <Card className="flex h-fit w-1/2 flex-col items-center justify-center border bg-slate-100 pb-8 shadow-lg shadow-slate-300">
      <CardHeader className="mb-4 w-full rounded-t-lg bg-slate-300 p-4 text-xl font-medium text-slate-600">
        <h1 className="text-xl">Login</h1>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col gap-6 px-10 py-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="text-base">Email</FormLabel>
                <Input
                  {...field}
                  placeholder="Enter your email"
                  className="bg-white text-lg"
                ></Input>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="text-base">Password</FormLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                  className="bg-white text-lg"
                ></Input>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" className="btn-pri mt-4 flex-1">
            Login
          </button>
        </form>
      </Form>
      <p className="flex gap-3 text-base">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="font-semibold text-sky-600 hover:text-sky-800 hover:underline hover:underline-offset-4 active:text-sky-900"
        >
          Signup
        </a>
      </p>
    </Card>
  );
};

export default LoginForm;
