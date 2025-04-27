
import { RegisterType } from "@/types";
import { z, ZodType } from "zod";


const RegisterSchema: ZodType<RegisterType> = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),  
    username: z.string().min(1, { message: "Username is required" }),
    password: z
      .string().min(1, { message: "Password is required" }),
  })

export default RegisterSchema;