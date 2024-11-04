import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import {
	Form,
	FormField,
	FormLabel,
	FormItem,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import { LoginFormSchema } from "@/utils/schemas/LecturerStudentSchemas";
import LoginUser from "@/utils/auth/LoginUser";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Returns a login form
 * @returns The login form
 */
const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  // submit handler
  const onSubmit = (data: z.infer<typeof LoginFormSchema>) => {
    LoginUser({ userData: data });
  }

  // show successful login toast message from another page if stated
  useEffect(() => {
    if (location.state?.showSuccessToast) {
      const successMessage = location.state.successMessage;
      toast.success(successMessage);

      // clear success message toast
      navigate(location.pathname, {replace: true});
    }
  }, [location, navigate])

  return (
    <Card className="w-1/2 pb-8 h-fit flex flex-col items-center justify-center
    bg-slate-100 border shadow-lg shadow-slate-300">
      <CardHeader className="bg-slate-300 w-full rounded-t-lg text-xl font-medium p-4 mb-4 text-slate-600">
      <h1 className="text-xl">Login</h1>
      </CardHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full py-4 px-10 flex flex-col gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="form-item">
              <FormLabel className="text-base">Email</FormLabel>
              <Input {...field} placeholder="Enter your email" className="text-lg bg-white"></Input>
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
              <Input {...field}  type="password" placeholder="Enter your password" className="text-lg bg-white"></Input>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="btn-pri flex-1 mt-4">
            Login
        </button>
      </form>
    </Form>
    </Card>
  )
}

export default LoginForm;
