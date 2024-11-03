import { z } from "zod";
import { signupFormSchema } from "../schemas/LecturerStudentSchemas";

// using z.infer to get the actual type of the schema
type UserDataType = z.infer<typeof signupFormSchema>;

interface registerUserProps {
  userData: UserDataType;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_BASE_URL;
const api_url = `${BACKEND_URL}${AUTH_API_URL}`;

const registerUser = async({ userData }: registerUserProps) => {
  console.log(`api url:`, api_url);// DEBUG
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
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}

export default registerUser;
