
import { LoginType } from "@/types";
import { z, ZodType } from "zod";


const LoginSchema: ZodType<LoginType> = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z
      .string().min(1, { message: "Password is required" }),
  })

export default LoginSchema;