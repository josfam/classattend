import { z } from "zod"

import { LoginFormSchema } from "../schemas/LecturerStudentSchemas";
import { auth_url } from "./AuthConstants";

// using z.infer to get the actual type of the schema
type UserDataType = z.infer<typeof LoginFormSchema>;

interface LoginUserProps {
  userData: UserDataType
}

const LoginUser = async({ userData }: LoginUserProps) => {
  console.log('calling login func in backend'); // DEBUG
  try {
    const response = await fetch(
      `${auth_url}login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
      }
    )
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

export default LoginUser;
