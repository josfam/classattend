import { z } from "zod"

import { LoginFormSchema } from "../schemas/LecturerStudentSchemas";
import { auth_url } from "./AuthConstants";

// using z.infer to get the actual type of the schema
type UserDataType = z.infer<typeof LoginFormSchema>;

interface LoginUserProps {
  userData: UserDataType
}

const LoginUser = async({ userData }: LoginUserProps) => {
  try {
    const response = await fetch(
      `${auth_url}login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
        credentials: "include",
      }
    )
    const data = await response.json();
    if (response.ok) {
      return {success: true, data: data};
    } else {
      return {success: false, message: data.message};
    }
  } catch (error) {
    console.error(error);
    return {success: false, message: "There was an error during login. Please try again"};
  }
}

export default LoginUser;
