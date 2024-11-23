import { z } from "zod";
import { SignupFormSchema } from "../schemas/LecturerStudentSchemas";
import { authApiPath } from "../urlPaths/apiPaths";
// using z.infer to get the actual type of the schema
type UserDataType = z.infer<typeof SignupFormSchema>;

interface signupUserProps {
  userData: UserDataType;
}

const signupUser = async ({ userData }: signupUserProps) => {
  console.log(`userData:`, userData); // DEBUG
  try {
    const response = await fetch(`${authApiPath}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "There was an error signing up. Please try again",
    };
  }
};

export default signupUser;
