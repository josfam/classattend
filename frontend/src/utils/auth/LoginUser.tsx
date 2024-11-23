import { z } from "zod";

import { LoginFormSchema } from "../schemas/LecturerStudentSchemas";
import { authApiPath } from "../urlPaths/apiPaths";

// using z.infer to get the actual type of the schema
type UserDataType = z.infer<typeof LoginFormSchema>;

interface LoginUserProps {
  userData: UserDataType;
}

const LoginUser = async ({ userData }: LoginUserProps) => {
  try {
    const response = await fetch(`${authApiPath}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data: data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "There was an error during login. Please try again",
    };
  }
};

export default LoginUser;
