import { z } from "zod";
import { SignupFormSchema } from "../schemas/LecturerStudentSchemas";

// using z.infer to get the actual type of the schema
type UserDataType = z.infer<typeof SignupFormSchema>;

interface signupUserProps {
  userData: UserDataType;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_BASE_URL;
const api_url = `${BACKEND_URL}${AUTH_API_URL}`;

const signupUser = async({ userData }: signupUserProps) => {
  console.log(`userData:`, userData);// DEBUG
  try {
    const response = await fetch(
      `${api_url}signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
    } else {
      console.log(data.message)
    }
  } catch (error) {
    console.log(error);
  }
}

export default signupUser;
