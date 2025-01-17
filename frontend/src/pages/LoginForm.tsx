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
import { LoginFormSchema } from "@/utils/schemasAndTypes/LecturerStudentSchemas";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Role } from "@/utils/schemasAndTypes/SchemaConstants";
import { SuccessToast, ErrorToast } from "@/components/Toasts";
import { jwtDecode } from "jwt-decode";
import { decodedJWTToken } from "@/utils/schemasAndTypes/Types";
import LoginUser from "@/utils/auth/LoginUser";
import LoadingSpinner from "@/components/LoadingSpinner";
import useUserStore from "@/store/userStore"; // zustand store

/**
 * Returns a login form
 * @returns The login form
 */
const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setRole } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
      const response = await LoginUser({ userData: data });
      if (response.success) {
        // decode the stored jwt token
        const decodedJWT: decodedJWTToken = jwtDecode(response.data);
        const role = decodedJWT.role;
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
    } finally {
      setIsLoading(false);
    }
  };

  // show successful login toast message from another page if stated
  useEffect(() => {
    if (location.state?.showSuccessToast) {
      SuccessToast({ message: location.state.message });
      navigate(location.pathname, { replace: true }); // clear message from toast
    }
    if (location.state?.showErrorToast) {
      ErrorToast({ message: location.state.message });
      navigate(location.pathname, { replace: true }); // clear message from toast
    }
  }, [location, navigate]);

  return (
    <Card className="flex h-fit w-full flex-col items-center justify-center border bg-slate-100 pb-8 shadow-lg shadow-slate-300 md:w-3/4 lg:w-1/2">
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
            {isLoading ? (
              <div className="flex items-center">
                <LoadingSpinner />
                <p>Logging in...</p>
              </div>
            ) : (
              <p>Login</p>
            )}
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
