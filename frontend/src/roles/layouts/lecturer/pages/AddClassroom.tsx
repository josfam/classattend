import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { AddClassroomSchema } from "@/utils/schemasAndTypes/LecturerStudentSchemas";
import { ErrorToast } from "@/components/Toasts";
import { classroomsPath } from "@/utils/urlPaths/appUrlPaths";
import addClassroom from "../utils/AddClassroomHandler";

const AddClassroom = () => {
  const form = useForm<z.infer<typeof AddClassroomSchema>>({
    resolver: zodResolver(AddClassroomSchema),
    defaultValues: {
      className: "",
      classCode: "",
      classDescription: "",
    },
  });
  const navigate = useNavigate();
  const submitHandler = async (
    classData: z.infer<typeof AddClassroomSchema>,
  ) => {
    const response = await addClassroom({ classData });
    if (response?.success) {
      // navigate back to classrooms
      navigate(`/lecturer/${classroomsPath}`, {
        state: { showSuccessToast: true, message: response.data.message },
      });
    } else {
      ErrorToast({ message: response.message });
    }
  };

  return (
    <>
      <Card className="flex h-fit w-1/2 flex-col items-center justify-center border bg-slate-100 pb-8 shadow-lg shadow-slate-300">
        <CardHeader className="mb-4 w-full rounded-t-lg bg-slate-300 p-4 text-xl font-medium text-slate-600">
          Add a classroom
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="flex h-full w-full flex-col gap-6 px-10 py-4"
          >
            <div className="flex flex-grow flex-col gap-3">
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem className="form-item flex-2">
                    <FormLabel className="text-base">Class Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the class name"
                        {...field}
                        className="bg-white text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classCode"
                render={({ field }) => (
                  <FormItem className="form-item flex-1">
                    <FormLabel className="text-base">Class code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter code"
                        {...field}
                        className="bg-white text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classDescription"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel className="text-base">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add class description"
                        id="classDescription"
                        className="!min-h-36 !rounded-lg bg-white !text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <button className="btn-pri">Add classroom</button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default AddClassroom;
